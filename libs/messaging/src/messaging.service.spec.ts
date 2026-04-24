import { Test, TestingModule } from '@nestjs/testing';
import { MessagingService } from './messaging.service';
import { EntitiesService } from 'obai/entities';
import { AiIntelligenceService, AgentGeneratorService } from 'obai/intelligence';
import { I18nService } from 'nestjs-i18n';

describe('MessagingService', () => {
  let service: MessagingService;

  beforeEach(async () => {
    const mockEntitiesService = {};
    const mockAiIntelligenceService = {};
    const mockAgentGeneratorService = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagingService,
        { provide: EntitiesService, useValue: mockEntitiesService },
        { provide: AiIntelligenceService, useValue: mockAiIntelligenceService },
        { provide: AgentGeneratorService, useValue: mockAgentGeneratorService },
        { provide: I18nService, useValue: { t: jest.fn((key: string) => key) } },
      ],
    }).compile();

    service = module.get<MessagingService>(MessagingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
