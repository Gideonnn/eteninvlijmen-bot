const Markup = require('telegraf/markup');
const WizardScene = require('telegraf/scenes/wizard')

const texts = require('../translations');

const api = require('../api');

const welcome = (ctx, next) => {
  ctx.reply(texts.startSceneEnter);
  ctx.wizard.next();
};

const register = (ctx, next) => {
  const message = ctx.update.message;

  const code = message.text;
  const tgUserId = ctx.update.message.from.id;
  const tgUserName = ctx.update.message.from.first_name;

  api.register(code, tgUserId, tgUserName)
    .then(({ data }) => {

      const inlineKeyboard = Markup.inlineKeyboard([
        Markup.callbackButton('Ja', 'yes'),
        Markup.callbackButton('Nee', 'no'),
      ]).extra();

      ctx.telegram.sendMessage(ctx.from.id, `Is je naam ${data.name}?`, inlineKeyboard);
    });
};

const success = (ctx) => {
  ctx.editMessageText(texts.startSceneRegisterSuccess);
  ctx.scene.leave()
};

const registerWizard = new WizardScene('register-wizard', welcome, register, success);

registerWizard.action('yes', (ctx, next) => {
  ctx.wizard.next();
  next();
});

registerWizard.action('no', ctx => {
  ctx.editMessageText(texts.startSceneNotMe);
});

registerWizard.command("cancel", ctx => ctx.stage.leave());

module.exports = registerWizard;
