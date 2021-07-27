import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config';


const validateAccess = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-auth-token'];

  if (token) {
    jwt.verify(token as string, SECRET_KEY, (err) => {
      if (err) {
        res.status(401).json({
          successful: false,
          msg: 'Incorrect token',
        })
      }

      next();
    })
  } else {
    res.status(403).json({
      successful: false,
      msg: 'No token',
    })
  }
}

export default validateAccess;
