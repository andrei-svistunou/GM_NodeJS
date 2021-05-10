import express, { Application, Request, Response, NextFunction } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import bodyParser from 'body-parser';
import AppRouter from './routes';

const port: number = parseInt(process.env.PORT, 10) || 3003;

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
const router = AppRouter();

app.use('/', router);
app.use((err: ExpressJoiError, _req: Request, res: Response, next: NextFunction) => {
  if (err && err.type) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  } else {
    return next(err);
  }
});

app.listen(port, (err?: Error) => {
  if (err) {
    console.error(err.stack);
  }
  console.info(`Server is ready on http://localhost:${port}`);
});


// process.on('uncaughtException', (err: Error, origin: string) => {
//   logger.error(`Error: ${err} | Origin: ${origin}`);
// });

// process.on('unhandledRejection', (reason: Error, promise) => {
//   logger.error(`Unhandled Rejection at: ${promise} | reason: ${reason}`);
// });
