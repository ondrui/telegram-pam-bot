import express from 'express';
import 'dotenv/config';
import { PORT } from './config.js';
import { Telegraf } from 'telegraf';

const app = express();

const token = process.env.TOKEN;
if (token === undefined) {
  throw new Error('TOKEN must be provided!');
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.replyWithHTML(
    'Приветстую в <b>PAM_bot</b>\n\n' + 'Я отвечаю на ваши вопросы'
  );
});

bot.hears('Привет', (ctx) => {
  ctx.replyWithHTML('Привет');
});

bot.hears('Как дела', (ctx) => {
  ctx.replyWithHTML('У меня всё хорошо');
});

bot.hears('Есть дело', (ctx) => {
  ctx.replyWithHTML('Если чем могу помочь - звони');
});

bot.hears('Когда увидимся', (ctx) => {
  ctx.replyWithHTML('Да, увидимся как нибудь');
});

bot.hears('Что делать', (ctx) => {
  ctx.replyWithHTML('Всё будет хорошо');
});

bot.hears('Ты мудак', (ctx) => {
  ctx.replyWithHTML('Взаимно');
});

bot.command('time', (ctx) => {
  ctx.reply(String(new Date()));
});

bot.on('text', (ctx) => {
  ctx.replyWithHTML(`Неправильный вопрос)`);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));
