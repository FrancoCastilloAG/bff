import { of } from 'rxjs';
import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

import { PanelService } from '../panel.service';
import { ConfigService } from '../../config/config.service';

import { USERS_MOCK } from './panel.mocks';

describe('PanelService', () => {
  let service: PanelService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PanelService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
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

    service = module.get<PanelService>(PanelService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get users list', async () => {
    const response: AxiosResponse<any> = {
      data: USERS_MOCK,
      status: 200,
      statusText: 'OK',
      config: {
        url: 'asdasd',
        headers: null,
      },
      headers: null,
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    const result = await service.getUsers();

    expect(result).toBeDefined();
    expect(result).toEqual(USERS_MOCK);
  });
});
