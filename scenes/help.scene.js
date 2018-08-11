const Scene = require('telegraf/scenes/base');
const { register } = require('../api');

module.exports = (sceneName) => {

  const scene = new Scene(sceneName);

  scene.enter(ctx => {
    ctx.reply(`
Ik kan jou en je vrienden helpen om jullie wekelijkse diner te plannen.

Je kan me gebruiken door middel van deze commando's:

*Account*
/register - Registreren bij de groep.

*Plannen*
/invullen - Je mogelijke dagen voor deze week doorgeven.

*Etc*
/ikdoenietmeermee - Verlaat de groep. Je zult geen notificaties meer ontvangen.
    `);
  });

  scene.on('message', async ctx => {
    const message = ctx.update.message;

    const { data } = await register(message.text, message.from.id);

    if (data) {
      ctx.reply(`Welkom ${data.name}!`);
    } else {
      ctx.reply('Je code lijkt niet te kloppen. Kun je het nog eens proberen?');
    }
  });

  return scene;
};
