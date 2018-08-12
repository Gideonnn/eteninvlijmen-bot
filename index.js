require('dotenv').config();

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

// Commands
const exitCommand = require('./commands/exit.commend');
const helpCommand = require('./commands/help.command');

// Wizards
const RegisterWizard = require('./wizards/register.wizard');

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([new RegisterWizard('register-wizard')]);

bot.use(session());
bot.use(stage.middleware());

bot.command('help', helpCommand);
bot.command('start', ctx => ctx.scene.enter('register-wizard'));
bot.command('houdoe', exitCommand);

bot.startPolling();
