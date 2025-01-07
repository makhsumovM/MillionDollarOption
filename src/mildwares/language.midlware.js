import { Keyboard } from 'grammy';

export const languageChoose = async (ctx, next) => {
  if (ctx.session.lang) {
    ctx.session.isChoosingLanguage = false
  } else {
    ctx.session.isChoosingLanguage = true
      await ctx.reply('Choose a language:', {
        reply_markup: new Keyboard()
          .text('Русский')
          .text('English')
          .oneTime()
          .resized(),
      });
    
  }
};
