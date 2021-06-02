import { LoggerService } from "../../services";

const ErrorHandler = (err, _req, res) => {
  if (err && err.type) {
    LoggerService.error(err.error.toString());
    return res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  }

  LoggerService.error(err.stack);
  return res.status(err.statusCode || 500).json({ message: err.message });
};

export default ErrorHandler;
