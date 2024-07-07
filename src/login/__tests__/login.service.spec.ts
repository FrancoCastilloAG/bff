import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { LoginService } from '../login.service';
import { ConfigService } from '../../config/config.service';

import { LOGIN_PARAMS, VALID_USER } from './login.mocks';

describe('LoginService', () => {
  let service: LoginService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getUserManagementUrl: jest.fn(() => 'url'),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should try to login', async () => {
    const response: AxiosResponse<any> = {
      data: VALID_USER,
      status: 200,
      statusText: 'OK',
      config: {
        url: 'asdasd',
        headers: null,
      },
      headers: null,
    };

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(response));

    const result = await service.loginUser(LOGIN_PARAMS);

    expect(result).toBeDefined();
    expect(result).toEqual(VALID_USER);
  });
});
