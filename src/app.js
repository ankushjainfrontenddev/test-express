import 'dotenv/config';
import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import compression from 'compression';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import * as configs from '@/config';

const { NODE_ENV } = process.env;

const app = express();

// Required middleware list
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(configs.corsConfig));

// // Define a custom CORS middleware to allow only the specified origin
// app.use(cors({
//   origin: (origin, callback) => {
//     if (origin === process.env.CORS_ALLOWED_ORIGIN || !process.env.CORS_ALLOWED_ORIGIN) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));
app.use(compression(configs.compressionConfig));
app.use(cookieParser());

// Load router paths
configs.routerConfig(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log('---->', err);
  res.status(err.status || 500).json(err);
});

export default app;
