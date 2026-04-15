import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

describe('DevicesController', () => {
  let controller: DevicesController;
  let service: DevicesService;
  const mockDevicesService = {
    registerDevice: jest.fn(),
    updateHeartbeat: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        {
          provide: DevicesService,
          useValue: mockDevicesService,
        },
      ],
    }).compile();
    controller = module.get<DevicesController>(DevicesController);
    service = module.get<DevicesService>(DevicesService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
