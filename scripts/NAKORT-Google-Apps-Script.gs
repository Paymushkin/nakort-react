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

    // Отправка email-уведомления (не блокирует ответ, если произойдёт ошибка)
    sendNotificationEmail(data, date);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Отправка email-уведомления о новой заявке.
 * Получатели: владелец таблицы и/или заданный email в NOTIFICATION_EMAIL.
 */
function sendNotificationEmail(data, date) {
  try {
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var recipients = [];
    
    // Добавляем email владельца таблицы
    try {
      var ownerEmail = spreadsheet.getOwner().getEmail();
      if (ownerEmail) recipients.push(ownerEmail);
    } catch (e) {
      // Если нет доступа к владельцу, пропускаем
    }
    
    // Можно задать конкретный email для уведомлений (раскомментируйте и укажите):
    // var NOTIFICATION_EMAIL = 'example@nakort.ru';
    // if (NOTIFICATION_EMAIL && recipients.indexOf(NOTIFICATION_EMAIL) === -1) {
    //   recipients.push(NOTIFICATION_EMAIL);
    // }
    
    if (recipients.length === 0) return; // Нет получателей
    
    var formName = data.form === 'training' ? 'Запись на тренировку' : 'Покупка сертификата';
    var sportName = data.sport === 'tennis' ? 'Теннис' : data.sport === 'padel' ? 'Падел' : data.sport;
    var formatName = data.format === 'group' ? 'Групповые' : 
                     data.format === 'personal' ? 'Персональные' : 
                     data.format === 'split' ? 'Сплит' : data.format;
    
    var subject = 'Новая заявка: ' + formName + ' — ' + data.name;
    var body = 'Новая заявка на сайте NAKORT\n\n' +
               'Форма: ' + formName + '\n' +
               'Вид спорта: ' + sportName + '\n' +
               'Формат: ' + formatName + '\n' +
               'Имя: ' + data.name + '\n' +
               'Телефон: ' + data.phone + '\n' +
               'Дата заявки: ' + date + '\n' +
               'Согласия: ' + (data.agreement1 && data.agreement2 ? 'да' : 'нет') + '\n\n' +
               'Таблица: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit';
    
    MailApp.sendEmail({
      to: recipients.join(','),
      subject: subject,
      body: body
    });
  } catch (e) {
    // Ошибка отправки email не должна ломать запись в таблицу
    // Можно залогировать: Logger.log('Email error: ' + e);
  }
}
