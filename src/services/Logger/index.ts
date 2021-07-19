import { createLogger, format, transports } from 'winston';

interface ILoggerService {
  info: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
}

const logLevel = process.env.LOG_LEVEL || 'info';

const { combine, timestamp, printf, colorize } = format;
const loggerFormat = printf((info) => {
  const { level, message, timestamp: time, ...meta } = info;
  
  return `| ${time} | ${level} | ${message} ${meta.msi ? `| ${meta.msi}` : ''}`;
});

const logger = createLogger({
  level: logLevel,
  format: combine(timestamp(), colorize(), loggerFormat),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});

class Logger implements ILoggerService {
  debug(message) {
    logger.debug(message);
  }
  info(message) {
    logger.info(message);
  }
  error(message) {
    logger.error(message);
  }
  warn(message) {
    logger.warn(message);
  }
}

const LoggerService = new Logger();

export { LoggerService };
