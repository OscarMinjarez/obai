import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

jest.mock('obai/auth', () => ({
  JwtAuthGuard: class JwtAuthGuard {},
}));

describe('DevicesController', () => {
  let controller: DevicesController;

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
  });

  const mockRequest = { user: { id: 'user-123' } };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call registerDevice with user.id from request', async () => {
    const dto = { name: 'Phone', type: 'Mobile' };
    await controller.register(mockRequest, dto);
    expect(mockDevicesService.registerDevice).toHaveBeenCalledWith('user-123', dto);
  });

  it('should call updateHeartbeat with deviceId from params', async () => {
    await controller.updateHeartbeat(mockRequest, 'device-456');
    expect(mockDevicesService.updateHeartbeat).toHaveBeenCalledWith('device-456');
  });
});
