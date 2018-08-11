const { leave } = require('telegraf/stage');
const { Markup } = require('telegraf/');
const Scene = require('telegraf/scenes/base');

const texts = require('../translations');

const { register } = require('../api');


module.exports = sceneName => {

  const scene = new Scene(sceneName);

  scene.enter(ctx => {
    ctx.reply(texts.startSceneEnter);
  });

  scene.on('text', async ctx => {
    const message = ctx.update.message;

    const code = message.text;
    const tgUserId = ctx.update.message.from.id;
    const tgUserName = ctx.update.message.from.first_name;

    const { data } = await register(code, tgUserId, tgUserName);

    if (data) {
      const inlineKeyboard = Markup.inlineKeyboard([
        Markup.callbackButton('Ja', 'yes'),
        Markup.callbackButton('Nee', 'no'),
      ]).extra();

      return ctx.telegram.sendMessage(ctx.from.id, `Is je naam ${data.name}?`, inlineKeyboard);
    }

    return ctx.reply(texts.startSceneRegisterError);
  });

  scene.action('yes', async ctx => {
    return ctx.editMessageText('texts.startSceneRegisterSuccess');
  });

  scene.action('no', async ctx => {
    return ctx.editMessageText('texts.startSceneNotMe');
  });

  return scene;
};
