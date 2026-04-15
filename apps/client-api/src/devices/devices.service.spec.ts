import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { DeviceRepository } from 'obai/entities';

describe('DevicesService', () => {
  let service: DevicesService;
  let repository: DeviceRepository;
  const mockDeviceRepository = {
    findByUserId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateLastSeen: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        {
          provide: DeviceRepository,
          useValue: mockDeviceRepository,
        },
      ],
    }).compile();
    service = module.get<DevicesService>(DevicesService);
    repository = module.get<DeviceRepository>(DeviceRepository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
