const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

const secrets = require('./secrets.json');
const texts = require('./translations');

const registerWizard = require('./wizards/register.wizard');

const bot = new Telegraf(secrets.telegramApiToken);
const stage = new Stage([registerWizard]);

bot.use(session());
bot.use(stage.middleware());

bot.command('help', ctx => ctx.replyWithMarkdown(texts.help));
bot.command('start', ctx => ctx.scene.enter('register-wizard'));
bot.command('houdoe', ctx => ctx.reply('doei'));

//debug
bot.command('debug', ctx => {
  ctx.reply('ack');
});

bot.startPolling();
