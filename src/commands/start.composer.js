import { Composer , Keyboard} from 'grammy';
import { languageChoose } from '../mildwares/language.midlware.js';
import { showMenuMiddleware } from '../mildwares/menu.middleware.js';

export const startComposer = new Composer();

startComposer.command('start', async (ctx,next) => {
  if (ctx.session.lang) {
    await showMenuMiddleware(ctx,next);
  } else {
    await next();
  }
});
