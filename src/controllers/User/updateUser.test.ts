import updateUser from './updateUser';
import { Response, Request } from 'express';
import * as UserService from '../../services/User';
import { LoggerService } from '../../services/Logger';
import User from '../../models/User';

jest.mock('../../services/User', () => ({
  updateUser: jest.fn(),
}));
jest.mock('../../models/User', jest.fn);

const loggerSeviceDebugMethod = jest.spyOn(LoggerService, 'debug');
const loggerSeviceErrorMethod = jest.spyOn(LoggerService, 'error');
const userServiceUpdateUser = jest.spyOn(UserService, 'updateUser');

describe('updateUser controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('user was updated successfully', async () => {
    userServiceUpdateUser.mockImplementation(() => Promise.resolve([42, []]));
    const mockedRequest = {
      params: {
        id: '123'
      },
      body: {
        login: 'user'
      }
    } as unknown as Request;
    const mockedResponse = {
      json: jest.fn(),
    } as unknown as Response;
    await updateUser(mockedRequest, mockedResponse);

    expect(userServiceUpdateUser).toHaveBeenCalledWith({ user_id: '123', login: 'user' });
    expect(loggerSeviceDebugMethod).toHaveBeenCalled();
    expect(mockedResponse.json).toHaveBeenCalledWith({ successful: true, msg: '123 user was changed' });
  })

  it('Error was caught', async () => {
    userServiceUpdateUser.mockImplementation(() => Promise.reject({message: 'Error!'}));
    const mockedRequest = {
      params: {
        id: 'test',
      },
      body: {
        login: 'badName'
      }
    } as unknown as Request;
    const mockedResponse = {
      json: jest.fn(),
      status: jest.fn().mockImplementation(function(_code){ return this }),
    } as unknown as Response;
    await updateUser(mockedRequest, mockedResponse);

    expect(userServiceUpdateUser).toHaveBeenCalledWith({ user_id: 'test', login: 'badName' });
    expect(loggerSeviceErrorMethod).toHaveBeenCalledWith('Error!');
    expect(mockedResponse.json).toHaveBeenCalledWith({
      successful: false,
      msg: 'Error!'
    });
  })
});
