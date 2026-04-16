import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { EntitiesService } from 'obai/entities';

describe('UsersService', () => {
  let service: UsersService;
  const mockEntitiesService = {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: EntitiesService,
          useValue: mockEntitiesService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
