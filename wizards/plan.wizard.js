const Markup = require('telegraf/markup');
const WizardScene = require('telegraf/scenes/wizard')

const texts = require('../translations');

class PlanScene extends WizardScene {

  constructor(name = 'plan-wizard') {
    super(name);
    this.options = { steps: [this.requestInput] }

    this.action('monday', this.toggleOne);
    this.action('tuesday', this.toggleOne);
    this.action('wednesday', this.toggleOne);
    this.action('thursday', this.toggleOne);
    this.action('friday', this.toggleOne);
    this.action('saturday', this.toggleOne);
    this.action('sunday', this.toggleOne);

    this.action('all', ctx => this.toggleAll(ctx, true));
    this.action('none', ctx => this.toggleAll(ctx, false));

    this.action('save', ctx => ctx.reply('Opslaan werkt nog niet.'));
  }

  requestInput(ctx) {
    ctx.reply(texts.planWizardInstructions, buildInlineKeyboard(ctx));
  }

  toggleOne(ctx) {
    const day = ctx.update.callback_query.data;
    ctx.session[day] = !ctx.session[day];
    ctx.editMessageText(texts.planWizardInstructions, buildInlineKeyboard(ctx));
  }

  toggleAll(ctx, bool) {
    ctx.session.monday = bool;
    ctx.session.tuesday = bool;
    ctx.session.wednesday = bool;
    ctx.session.thursday = bool;
    ctx.session.friday = bool;
    ctx.session.saturday = bool;
    ctx.session.sunday = bool;
    ctx.editMessageText(texts.planWizardInstructions, buildInlineKeyboard(ctx));
  }

  save(ctx) {

    const planning = {
      monday: ctx.session.monday,
      tuesday: ctx.session.tuesday,
      wednesday: ctx.session.wednesday,
      thursday: ctx.session.thursday,
      friday: ctx.session.friday,
      saturday: ctx.session.saturday,
      sunday: ctx.session.sunday,
    };

    // TODO: send to api

    ctx.editMessageText(texts.planWizardSuccess);
    ctx.scene.leave();
  }
}

const buildInlineKeyboard = (ctx) => {
  return Markup.inlineKeyboard([
    [
      Markup.callbackButton(ctx.session.monday ? '[Ma]' : 'Ma', 'monday'),
      Markup.callbackButton(ctx.session.tuesday ? '[Di]' : 'Di', 'tuesday'),
      Markup.callbackButton(ctx.session.wednesday ? '[Wo]' : 'Wo', 'wednesday'),
      Markup.callbackButton(ctx.session.thursday ? '[Do]' : 'Do', 'thursday'),
    ],
    [
      Markup.callbackButton(ctx.session.friday ? '[Vr]' : 'Vr', 'friday'),
      Markup.callbackButton(ctx.session.saturday ? '[Za]' : 'Za', 'saturday'),
      Markup.callbackButton(ctx.session.sunday ? '[Zo]' : 'Zo', 'sunday'),
    ],
    [
      Markup.callbackButton('Geen 👎', 'none'),
      Markup.callbackButton('Allemaal 👍', 'all'),
    ],
    [
      Markup.callbackButton('Opslaan', 'save'),
    ],
  ]).extra();
}

module.exports = PlanScene;
