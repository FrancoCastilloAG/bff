import { Test, TestingModule } from '@nestjs/testing';

import { LoginController } from '../login.controller';
import { LoginService } from '../login.service';

import { LOGIN_PARAMS, VALID_USER } from './login.mocks';

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        LoginController,
        {
          provide: LoginService,
          useValue: {
            loginUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should try to login', async () => {
    jest.spyOn(service, 'loginUser').mockResolvedValue(VALID_USER);

    const result = await controller.loginUser(LOGIN_PARAMS);

    expect(result).toBeDefined();
    expect(result).toEqual(VALID_USER);
  });
});
