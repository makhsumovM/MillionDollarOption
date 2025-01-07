import { Composer, Keyboard } from 'grammy';
import { languageChoose } from '../midlwares/language.midlware.js';
import { showMenuMiddleware } from '../midlwares/menu.middleware.js';

export const startComposer = new Composer();

startComposer.command('start', async (ctx, next) => {
  if (ctx.session.lang) {
    await showMenuMiddleware(ctx, next);
  } else {
    await next();
  }
});
