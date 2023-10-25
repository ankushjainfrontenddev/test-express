import indexRouter from '@/routes/index';
import chatbotRouter from '@/routes/chatbot';

export default function (app) {
  app.use('/', indexRouter);
  app.use('/chatbot', chatbotRouter);
}
