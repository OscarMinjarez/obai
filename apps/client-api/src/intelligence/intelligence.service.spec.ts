import { Test, TestingModule } from '@nestjs/testing';
import { IntelligenceService } from './intelligence.service';
import {
  DeviceRepository,
  AgentRepository,
  AgentEntity,
  AgentGender,
  AgentMaturity,
} from 'obai/entities';
import { AiIntelligenceService } from 'obai/intelligence';

describe('IntelligenceService', () => {
  let service: IntelligenceService;

  const mockDeviceRepo = {
    findMostRecentByUserId: jest.fn(),
  };

  const mockAgentRepo = {
    findByUserId: jest.fn(),
  };

  const mockAiService = {
    analyzeContext: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntelligenceService,
        { provide: DeviceRepository, useValue: mockDeviceRepo },
        { provide: AgentRepository, useValue: mockAgentRepo },
        { provide: AiIntelligenceService, useValue: mockAiService },
      ],
    }).compile();

    service = module.get<IntelligenceService>(IntelligenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should analyze context using the user agent persona', async () => {
    const mockAgent = new AgentEntity({
      name: 'Test Agent',
      personality: 'Kind',
      behaviors: ['Polite'],
      maturity: 'MATURE',
      gender: 'FEMALE',
      language: 'Spanish',
      userId: 'user-123',
    });

    const mockDevice = { id: 'device-1', name: 'Phone' };

    mockDeviceRepo.findMostRecentByUserId.mockResolvedValue(mockDevice);
    mockAgentRepo.findByUserId.mockResolvedValue(mockAgent);
    mockAiService.analyzeContext.mockResolvedValue('Hi user');

    const loggerSpy = jest.spyOn(service['logger'], 'log');

    await service.analyzeContextAndNotify('user-123', 'Hello');

    expect(mockAiService.analyzeContext).toHaveBeenCalledWith('Hello', expect.any(AgentEntity));
    expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('[Agent: Test Agent]'));
  });
});
