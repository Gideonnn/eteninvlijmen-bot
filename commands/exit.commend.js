const api = require('../api');
const texts = require('../translations');

module.exports = (ctx) => {
  api.unregister(ctx.update.message.from.id)
    .then(({ data }) => {
      if (data) {
        ctx.replyWithMarkdown(texts.exitSuccess);
      } else {
        ctx.replyWithMarkdown(texts.exitError);
      }
    });
};
