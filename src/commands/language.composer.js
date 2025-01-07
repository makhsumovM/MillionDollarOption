import { Composer, Keyboard } from 'grammy';
import { showMenuMiddleware } from '../mildwares/menu.middleware.js';

export const languageComposer = new Composer();

languageComposer.command('language', async (ctx) => {
  if (ctx.session.lang) {
    ctx.session.isChoosingLanguage = true;
    await ctx.reply('Choose a language:', {
      reply_markup: new Keyboard().text('Русский').text('English').oneTime().resized(),
    });
  }
});

// Обработчик для кнопки "Русский"
languageComposer.hears('Русский', async (ctx, next) => {
  if (ctx.session.isChoosingLanguage) {
    ctx.session.lang = 'ru';
    await ctx.i18n.setLocale('ru');
    await ctx.reply('Язык изменен на Русский');
    ctx.session.isChoosingLanguage = false; 
    await showMenuMiddleware(ctx,next);
  } else {
    await next(); 
  }
});

// Обработчик для кнопки "English"
languageComposer.hears('English', async (ctx, next) => {
  if (ctx.session.isChoosingLanguage) {
    ctx.session.lang = 'en';
    await ctx.i18n.setLocale('en');
    await ctx.reply('Language changed to English');
    ctx.session.isChoosingLanguage = false;
    await showMenuMiddleware(ctx,next);
  } else {
    await next(); 
  }
});

