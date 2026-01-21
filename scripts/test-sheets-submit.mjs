/**
 * Одноразовая отправка тестовых данных в Google Таблицу.
 * Загружает NEXT_PUBLIC_GOOGLE_SCRIPT_URL из .env.local.
 *
 * Запуск: node scripts/test-sheets-submit.mjs
 * или:   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://... node scripts/test-sheets-submit.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function loadEnv() {
  try {
    const raw = readFileSync(join(root, '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*NEXT_PUBLIC_GOOGLE_SCRIPT_URL\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '').trim();
    }
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  return process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || null;
}

const url = loadEnv();
if (!url) {
  console.error('NEXT_PUBLIC_GOOGLE_SCRIPT_URL не найден в .env.local и не передан в env');
  process.exit(1);
}

const normalizePhone = (p) => String(p || '').trim().replace(/^\+7\s*/, '8');

const payload = {
  form: 'training',
  sport: 'Теннис',
  format: 'Групповое занятие',
  name: 'Тест Тестов',
  phone: normalizePhone('+7 999 123-45-67'),
  agreement1: 'on',
  agreement2: 'on',
};

console.log('URL:', url);
console.log('Тело:', JSON.stringify(payload, null, 2));
console.log('Отправка POST...');

const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
const text = await res.text();
console.log('HTTP', res.status, res.statusText);
console.log('Ответ:', text);

let json;
try {
  json = JSON.parse(text);
} catch {
  console.log('(ответ не JSON)');
  process.exit(res.ok ? 0 : 1);
}

if (json.ok) {
  console.log('OK: заявка записана в таблицу.');
} else {
  console.error('Ошибка:', json.error || 'неизвестная');
  process.exit(1);
}
