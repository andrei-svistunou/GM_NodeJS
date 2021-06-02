import morgan from 'morgan';
import { LoggerService } from '../../services';

const LoggerMiddleware = () => {
  try {
    const loggerOptions = {
      stream: {
        write: (message: string) => {
          const separator = '|';
          const statusIndex = 1;
          const statusCode = message.split(separator)[statusIndex].trim();
          const levelType = Number(statusCode) > 400 ? 'error' : 'info';

          LoggerService[levelType](message.slice(0, -1));
        },
      },
    };
    const messageFormat = ':method | :status | :url | :response-time ms';
    return morgan(messageFormat, loggerOptions);
  } catch(error) {
    LoggerService.error(error.stack);
    
  }
};

export default LoggerMiddleware;