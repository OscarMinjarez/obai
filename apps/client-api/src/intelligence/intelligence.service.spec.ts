import { Test, TestingModule } from '@nestjs/testing';
import { IntelligenceService } from './intelligence.service';
import { DeviceRepository } from 'obai/entities';

describe('IntelligenceService', () => {
  let service: IntelligenceService;
  let deviceRepo: DeviceRepository;
  const mockDeviceRepo = {
    findMostRecentByUserId: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntelligenceService,
        {
          provide: DeviceRepository,
          useValue: mockDeviceRepo,
        },
      ],
    }).compile();
    service = module.get<IntelligenceService>(IntelligenceService);
    deviceRepo = module.get<DeviceRepository>(DeviceRepository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findTargetDevice', () => {
    it('should return null if no device is found', async () => {
      mockDeviceRepo.findMostRecentByUserId.mockResolvedValue(null);
      const result = await service.findTargetDevice('user-123');
      expect(result).toBeNull();
      expect(deviceRepo.findMostRecentByUserId).toHaveBeenCalledWith('user-123');
    });
    it('should return a DeviceResponse if a device is found', async () => {
      const mockDevice = {
        id: 'device-1',
        name: 'Test Device',
        type: 'MOBILE',
        isActive: true,
        lastSeen: new Date(),
        userId: 'user-123',
      };
      mockDeviceRepo.findMostRecentByUserId.mockResolvedValue(mockDevice);
      const result = await service.findTargetDevice('user-123');
      expect(result).toBeDefined();
      expect(result?.id).toBe('device-1');
      expect(result?.name).toBe('Test Device');
    });
  });
  describe('analyzeContextAndNotify', () => {
    it('should log a message when a device is found', async () => {
      const loggerSpy = jest.spyOn(service['logger'], 'log');
      mockDeviceRepo.findMostRecentByUserId.mockResolvedValue({
        id: 'device-1',
        name: 'Test Device',
      });
      await service.analyzeContextAndNotify('user-123', 'Important Message');
      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining('Proactive event for user user-123 on device device-1'),
      );
    });
    it('should log a warning when no device is found', async () => {
      const loggerSpy = jest.spyOn(service['logger'], 'warn');
      mockDeviceRepo.findMostRecentByUserId.mockResolvedValue(null);
      await service.analyzeContextAndNotify('user-123', 'Important Message');
      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining('No active device found for user user-123'),
      );
    });
  });
});
