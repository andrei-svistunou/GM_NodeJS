import createUser from './createUser';
import { Response } from 'express';
import { TValidatedRequest } from '../../middlewares/User';
import User from '../../models/User';
import * as UserService from '../../services/User';
import { LoggerService } from '../../services/Logger';

jest.mock('../../models/User', jest.fn);

const loggerSeviceDebugMethod = jest.spyOn(LoggerService, 'debug');
const loggerSeviceErrorMethod = jest.spyOn(LoggerService, 'error');
const userServiceCreateUser = jest.spyOn(UserService, 'createUser');

describe('createUser controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('New user was created successfully', async () => {
    userServiceCreateUser.mockImplementation(() => Promise.resolve({} as User));
    const mockedRequest = {
      body: {
        login: 'login',
        password: 'password',
        age: 20,
      }
    } as TValidatedRequest;
    const mockedResponse = {
      json: jest.fn(),
    } as unknown as Response;
    await createUser(mockedRequest, mockedResponse);

    expect(userServiceCreateUser).toHaveBeenCalledWith({
      login: 'login',
      password: 'password',
      age: 20,
    });
    expect(loggerSeviceDebugMethod).toHaveBeenCalled();
    expect(mockedResponse.json).toHaveBeenCalledWith({ successful: true });
  })

  it('Error was caught', async () => {
    userServiceCreateUser.mockImplementation(() => Promise.reject({message: 'Ooops!'}));
    const mockedRequest = {
      body: {
        login: 'login1',
        password: 'password1',
        age: 2,
      }
    } as TValidatedRequest;
    const mockedResponse = {
      json: jest.fn(),
      status: jest.fn().mockImplementation(function(_code){ return this }),
    } as unknown as Response;
    await createUser(mockedRequest, mockedResponse);

    expect(userServiceCreateUser).toHaveBeenCalledWith({
      login: 'login1',
      password: 'password1',
      age: 2,
    });
    expect(loggerSeviceErrorMethod).toHaveBeenCalledWith('Ooops!');
    expect(mockedResponse.json).toHaveBeenCalledWith({
      successful: false,
      msg: 'Ooops!'
    });
  })
});
