require('dotenv').config();

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

// Commands
const exitCommand = require('./commands/exit.commend');
const helpCommand = require('./commands/help.command');
const startCommand = require('./commands/start.command');
const planCommand = require('./commands/plan.command');

// Wizards
const RegisterWizard = require('./wizards/register.wizard');
const PlanWizard = require('./wizards/plan.wizard');

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([
  new RegisterWizard('register-wizard'),
  new PlanWizard('plan-wizard'),
]);

bot.use(session());
bot.use(stage.middleware());

bot.command('help', helpCommand);
bot.command('houdoe', exitCommand);
bot.command('plan', planCommand);
bot.command('start', startCommand);

bot.startPolling();
