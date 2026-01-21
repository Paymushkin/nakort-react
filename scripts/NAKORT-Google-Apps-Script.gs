/**
 * NAKORT — приём данных форм и запись в Google Таблицу
 * Таблица: https://docs.google.com/spreadsheets/d/102VwWrCHIVKI2ImByDJZ3Y7oO9N6sKDz7bD8aGFC_C4/edit?usp=sharing
 *
 * УСТАНОВКА:
 * 1. Откройте таблицу по ссылке выше.
 * 2. Расширения → Apps Script.
 * 3. Вставьте этот код, сохраните.
 * 4. Развернуть → Новое развёртывание → Тип: Веб-приложение.
 *    - Выполнять от имени: меня, Доступ: все пользователи.
 * 5. Скопируйте URL веб-приложения ( .../exec ) в .env.local:
 *    NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/ВАШ_ID/exec
 */

var SPREADSHEET_ID = '102VwWrCHIVKI2ImByDJZ3Y7oO9N6sKDz7bD8aGFC_C4';

/**
 * GET /exec — проверка, что развёрнут именно NAKORT-скрипт.
 * Формы отправляют POST; doPost обрабатывает заявки.
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'NAKORT Apps Script is working',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    var data = JSON.parse(e.postData.contents);

    var headers = ['Дата', 'Форма', 'Вид спорта', 'Формат', 'Имя', 'Телефон', 'Согласия'];
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    var date = Utilities.formatDate(new Date(), 'Europe/Moscow', 'dd.MM.yyyy HH:mm');
    var form = data.form || '';
    var sport = data.sport || '';
    var format = data.format || '';
    var name = data.name || '';
    var phone = data.phone || '';
    var agreement = (data.agreement1 && data.agreement2) ? 'да' : 'нет';

    sheet.appendRow([date, form, sport, format, name, phone, agreement]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
