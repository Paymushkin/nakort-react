/**
 * Прокси для отправки данных в Google Apps Script.
 * Запросы с браузера идут на этот API (нет CORS), сервер проксирует в Apps Script.
 */

import { NextRequest, NextResponse } from 'next/server';

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export async function POST(request: NextRequest) {
  if (!SCRIPT_URL) {
    return NextResponse.json({ ok: false, error: 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL не задан' }, { status: 500 });
  }

  let body: string;
  try {
    body = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: 'Не удалось прочитать тело запроса' }, { status: 400 });
  }

  let data: { agreement1?: string; agreement2?: string };
  try {
    data = JSON.parse(body);
  } catch {
    return NextResponse.json({ ok: false, error: 'Неверный JSON' }, { status: 400 });
  }
  if (!data.agreement1 || !data.agreement2) {
    return NextResponse.json({ ok: false, error: 'Необходимо принять оба соглашения' }, { status: 400 });
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    const text = await res.text();
    // Пробрасываем ответ Apps Script как есть (JSON { ok } или { ok, error })
    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Ошибка при обращении к скрипту';
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
