import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { createClient } from '@supabase/supabase-js';
import { UserRepository, EntitiesService } from 'obai/entities';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let mockSupabase: any;
  let mockUserRepo: any;
  let mockEntities: any;

  beforeEach(async () => {
    mockSupabase = {
      auth: {
        signUp: jest.fn(),
        signInWithPassword: jest.fn(),
        signOut: jest.fn(),
      },
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    mockUserRepo = {
      create: jest.fn(),
    };

    mockEntities = {
      session: {
        create: jest.fn(),
        deleteMany: jest.fn(),
      },
    };

    process.env.SUPABASE_URL = 'http://localhost';
    process.env.SUPABASE_ANON_KEY = 'key';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: mockUserRepo },
        { provide: EntitiesService, useValue: mockEntities },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUpWithEmailAndPassword', () => {
    it('should call supabase.auth.signUp and return data', async () => {
      const mockResult = { data: { user: { id: '1' } }, error: null };
      mockSupabase.auth.signUp.mockResolvedValue(mockResult);

      const result = await service.signUpWithEmailAndPassword('test@obai.com', '123456', 'Name');

      expect(result).toEqual(mockResult.data);
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@obai.com',
        password: '123456',
        options: { data: { name: 'Name' } },
      });
    });

    it('should throw error if supabase returns error', async () => {
      mockSupabase.auth.signUp.mockResolvedValue({ data: null, error: new Error('Fail') });

      await expect(service.signUpWithEmailAndPassword('test', 'test', 'test'))
        .rejects.toThrow('Fail');
    });
  });

  describe('signInWithEmailAndPassword', () => {
    it('should call supabase.auth.signInWithPassword and return data', async () => {
      const mockResult = { data: { session: { token: 'abc' } }, error: null };
      mockSupabase.auth.signInWithPassword.mockResolvedValue(mockResult);

      const result = await service.signInWithEmailAndPassword('test@obai.com', '123456');

      expect(result).toEqual(mockResult.data);
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@obai.com',
        password: '123456',
      });
    });
  });
});
