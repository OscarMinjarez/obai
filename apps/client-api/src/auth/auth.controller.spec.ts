import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from 'obai/auth';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn().mockReturnValue(jest.fn()),
}));

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signUpWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call register on service', async () => {
    const dto = { email: 'a@a.com', password: '123', name: 'N' };
    await controller.register(dto);
    expect(service.signUpWithEmailAndPassword).toHaveBeenCalledWith(dto.email, dto.password, dto.name);
  });

  it('should call login on service', async () => {
    const dto = { email: 'a@a.com', password: '123' };
    await controller.login(dto);
    expect(service.signInWithEmailAndPassword).toHaveBeenCalledWith(dto.email, dto.password);
  });
});
