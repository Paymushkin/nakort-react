/**
 * Отправка данных формы в Google Таблицу.
 * Идёт через API /api/submit-to-sheets (обходит CORS), тот проксирует в Apps Script.
 * NEXT_PUBLIC_GOOGLE_SCRIPT_URL задаётся в .env.local
 */

export type FormSource = 'training' | 'certificate';

export type FormPayload = {
  form: FormSource;
  sport: string;
  format: string;
  name: string;
  phone: string;
  agreement1?: string;
  agreement2?: string;
};

/** +7 в начале номера → 8, чтобы в Google Таблице не парсилось как формула (#ERROR!) */
function normalizePhone(phone: string): string {
  return String(phone || '').trim().replace(/^\+7\s*/, '8');
}

const AGREEMENTS_REQUIRED = 'Необходимо принять оба соглашения';

export async function submitToSheets(payload: FormPayload): Promise<{ ok: boolean; error?: string }> {
  if (!payload.agreement1 || !payload.agreement2) {
    return { ok: false, error: AGREEMENTS_REQUIRED };
  }
  const url = '/api/submit-to-sheets';
  const body = { ...payload, phone: normalizePhone(payload.phone) };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let json: { ok?: boolean; error?: string };
    try {
      json = JSON.parse(text);
    } catch {
      return { ok: false, error: res.ok ? 'Неверный ответ' : `HTTP ${res.status}` };
    }
    return { ok: Boolean(json.ok), error: json.error };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Ошибка сети' };
  }
}
