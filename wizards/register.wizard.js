const Markup = require('telegraf/markup');
const WizardScene = require('telegraf/scenes/wizard')

const texts = require('../translations');

const api = require('../api');

class RegisterScene extends WizardScene {

  constructor(name = 'register-wizard') {
    super(name);
    this.options = { steps: [this.welcome, this.register, this.success]}
    this.action('yes', this.yes);
    this.action('no', this.no);
  }

  welcome(ctx) {
    ctx.reply(texts.startWizardEnter);
    ctx.wizard.next();
  };

  register(ctx) {
    const message = ctx.update.message;

    const code = message.text;
    const tgUserId = ctx.update.message.from.id;
    const tgUserName = ctx.update.message.from.first_name;

    api.register(code, tgUserId, tgUserName)
      .then(({ data }) => {

        if (data) {
          const inlineKeyboard = Markup.inlineKeyboard([
            Markup.callbackButton('Ja', 'yes'),
            Markup.callbackButton('Nee', 'no'),
          ]).extra();
          ctx.reply(`Is je naam ${data.name}?`, inlineKeyboard);
        } else {
          ctx.reply(texts.startWizardRegisterError);
        }
      });
  };

  success(ctx) {
    ctx.editMessageText(texts.startWizardRegisterSuccess);
    ctx.scene.leave()
  };

  no(ctx) {
    ctx.editMessageText(texts.startWizardNotMe);
  }

  yes(ctx, next) {
    ctx.wizard.next();
    next();
  }
}

module.exports = RegisterScene;
