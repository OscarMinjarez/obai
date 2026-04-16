import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { DeviceRepository } from 'obai/entities';

describe('DevicesService', () => {
  let service: DevicesService;

  const mockDeviceRepo = {
    findByUserId: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    updateLastSeen: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        {
          provide: DeviceRepository,
          useValue: mockDeviceRepo,
        },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
