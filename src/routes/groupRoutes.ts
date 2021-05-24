import express, { Router } from 'express';
import { GroupValidator } from '../middlewares';
import { GroupController } from '../controllers';

const GroupRouter = (): Router => {
  const groupRouter = express.Router();

  groupRouter.get('/all', GroupController.getGroups);
  groupRouter.get('/:id', GroupController.getGroup);
  groupRouter.post('/add', GroupValidator.validateGroup, GroupController.createGroup);
  groupRouter.post('/:id/update', GroupValidator.validateGroup, GroupController.updateGroup);
  groupRouter.delete('/:id', GroupController.deleteGroup);

  return groupRouter;
};

export default GroupRouter;
