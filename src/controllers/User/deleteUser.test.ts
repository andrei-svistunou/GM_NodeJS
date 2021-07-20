import deleteUser from './deleteUser';
import { Response, Request } from 'express';
import * as UserService from '../../services/User';
import { LoggerService } from '../../services/Logger';

jest.mock('../../services/User', () => ({
  deleteUser: jest.fn(),
}));
const loggerSeviceDebugMethod = jest.spyOn(LoggerService, 'debug');
const loggerSeviceErrorMethod = jest.spyOn(LoggerService, 'error');
const userServiceDeleteUser = jest.spyOn(UserService, 'deleteUser');

describe('deleteUser controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('New user was deleted successfully', async () => {
    userServiceDeleteUser.mockImplementation(() => Promise.resolve([42, []]));
    const mockedRequest = {
      params: {
        id: 'userId'
      }
    } as unknown as Request;
    const mockedResponse = {
      json: jest.fn(),
    } as unknown as Response;
    await deleteUser(mockedRequest, mockedResponse);

    expect(userServiceDeleteUser).toHaveBeenCalledWith('userId');
    expect(loggerSeviceDebugMethod).toHaveBeenCalled();
    expect(mockedResponse.json).toHaveBeenCalledWith({ successful: true, msg: 'User was deleted' });
  })

  it('Error was caught', async () => {
    userServiceDeleteUser.mockImplementation(() => Promise.reject({message: 'Error!'}));
    const mockedRequest = {
      params: {
        id: 'test',
      }
    } as unknown as Request;
    const mockedResponse = {
      json: jest.fn(),
      status: jest.fn().mockImplementation(function(_code){ return this }),
    } as unknown as Response;
    await deleteUser(mockedRequest, mockedResponse);

    expect(userServiceDeleteUser).toHaveBeenCalledWith('test');
    expect(loggerSeviceErrorMethod).toHaveBeenCalledWith('Error!');
    expect(mockedResponse.json).toHaveBeenCalledWith({
      successful: false,
      msg: 'User wasn\'t found'
    });
  })
});
