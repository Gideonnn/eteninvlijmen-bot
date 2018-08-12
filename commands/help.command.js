const texts = require('../translations');

module.exports = (ctx) => {
  ctx.replyWithMarkdown(texts.help);
};
