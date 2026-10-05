// scripts/setupEthereal.js
// Скрипт для створення тестового Ethereal акаунта

import nodemailer from 'nodemailer';
import fs from 'node:fs/promises';
import path from 'node:path';

async function setupEthereal() {
  console.log('📧 Створюю тестовий Ethereal акаунт...\n');

  try {
    // Генеруємо тестовий акаунт
    const testAccount = await nodemailer.createTestAccount();

    console.log('✅ Акаунт створений успішно!\n');
    console.log('📋 Додайте ці значення у .env файл:\n');
    console.log(`SMTP_HOST=${testAccount.smtp.host}`);
    console.log(`SMTP_PORT=${testAccount.smtp.port}`);
    console.log(`SMTP_USER=${testAccount.user}`);
    console.log(`SMTP_PASSWORD=${testAccount.pass}`);
    console.log(`SMTP_FROM=${testAccount.user}`);
    console.log(`\n🔗 Веб-інтерфейс для перегляду писем: https://ethereal.email/messages\n`);

    // Тестуємо відправку листа
    console.log('🧪 Тестую відправку листа...\n');

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: testAccount.user,
      to: 'test@example.com',
      subject: 'Test Email from nodejs-hw',
      html: '<h1>✅ Все працює!</h1><p>Цей лист був відправлений через Ethereal Email для тестування.</p>',
    });

    console.log('✅ Лист відправлений успішно!\n');
    console.log(`📧 Перегляньте його тут: ${nodemailer.getTestMessageUrl(info)}\n`);

  } catch (error) {
    console.error('❌ Помилка:', error.message);
    process.exit(1);
  }
}

setupEthereal();
