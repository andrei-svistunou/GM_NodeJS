import express, { Application, Request, Response, NextFunction } from 'express';
import { urlencoded } from 'body-parser';
import cors from 'cors';

import AppRouter from './routes';
import { LoggerService } from './services';
import LoggerMiddleware from './middlewares/LoggerMiddleware';
import ErrorHandler from './middlewares/ErrorHandler/ErrorHandler';

const port: number = parseInt(process.env.PORT, 10) || 3003;

process.on('unhandledRejection', error => {
  throw error
 })

process.on('uncaughtException', error => {
  LoggerService.error(error.stack); 
  process.exit(1)
});

const app: Application = express();

app.use(cors());

app.use(urlencoded({ extended: false }));

app.use(LoggerMiddleware());

app.use('/', AppRouter());

app.use(ErrorHandler);

app.listen(port, (err?: Error) => {
  if (err) {
    LoggerService.error(err.stack);
  }
  LoggerService.info(`Server is ready on http://localhost:${port}`);
});
