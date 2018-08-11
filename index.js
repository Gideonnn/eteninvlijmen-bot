const secrets = require('./secrets.json');
const texts = require('./translations');

const Telegraf = require('telegraf');
const Markup = require('telegraf/');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const { enter, leave } = Stage;

const startScene = require('./scenes/start.scene')('start');

const bot = new Telegraf(secrets.telegramApiToken);
const stage = new Stage([startScene], { ttl: 10 });

bot.use(session());
bot.use(stage.middleware());

bot.command('help', ctx => ctx.replyWithMarkdown(texts.help));
bot.command('start', enter('start'));
bot.command('houdoe', ctx => ctx.reply('doei'));

//debug
bot.command('debug', ctx => {
  console.log(ctx);
  ctx.reply('ack');
});

bot.startPolling();
