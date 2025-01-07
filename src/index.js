import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { Bot, GrammyError, HttpError, session } from 'grammy';
import { hydrate } from '@grammyjs/hydrate';
import { I18n } from '@grammyjs/i18n';
import { startComposer } from './commands/start.composer.js';
import { languageChoose } from './midlwares/language.midlware.js';
import { languageComposer } from './commands/language.composer.js';
import path from 'path';
import { showMenuMiddleware } from './midlwares/menu.middleware.js';

dotenv.config();

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bot = new Bot(process.env.BOT_API_KEY);
const i18n = new I18n({
  defaultLocale: 'en',
  useSession: true,
  // Указываем абсолютный путь к папке locales
  directory: path.join(__dirname, '../locales'),
});

bot.use(
  session({
    initial: () => ({
      lang: null,
      isChoosingLanguage: true,
    }),
  })
);

bot.use(i18n);
bot.use(hydrate());

bot.api.setMyCommands([
  { command: 'start', description: 'Bot start' },
  { command: 'language', description: 'Language' },
]);

// Подключаем обработчики
bot.use(startComposer);
bot.use(languageComposer);
bot.use(languageChoose);
bot.use(showMenuMiddleware);

bot.command('help', async (ctx) => {
  await ctx.reply('Help command is working');
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

bot.start();
