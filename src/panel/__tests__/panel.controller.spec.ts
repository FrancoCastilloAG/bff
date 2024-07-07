import { Test } from '@nestjs/testing';
import { PanelController } from '../panel.controller';
import { PanelService } from '../panel.service';
import { USERS_MOCK } from './panel.mocks';

describe('PanelController', () => {
  let controller: PanelController;
  let service: PanelService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PanelController,
        {
          provide: PanelService,
          useValue: {
            getUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PanelController>(PanelController);
    service = module.get<PanelService>(PanelService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should to get users', async () => {
    jest.spyOn(service, 'getUsers').mockResolvedValue(USERS_MOCK);

    const result = await controller.getUsers();

    expect(result).toBeDefined();
    expect(result).toEqual(USERS_MOCK);
  });
});
