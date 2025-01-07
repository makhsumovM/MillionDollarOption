import { Keyboard } from 'grammy';

export const showMenuMiddleware = async (ctx,next) => {
  await ctx.reply('Menu', {
    reply_markup: new Keyboard()
      .text(ctx.t('getAccess'))
      .text(ctx.t('verifyId'))
      .row()
      .text(ctx.t('support')).oneTime()
      .resized(),
  });
  await next();
};
