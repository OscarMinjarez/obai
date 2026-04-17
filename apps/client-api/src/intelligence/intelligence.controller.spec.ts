import { Test, TestingModule } from '@nestjs/testing';
import { IntelligenceController } from './intelligence.controller';
import { IntelligenceService } from './intelligence.service';
import { AgentGeneratorService } from 'obai/intelligence';
import { AgentRepository } from 'obai/entities';

describe('IntelligenceController', () => {
  let controller: IntelligenceController;
  let intelligenceService: IntelligenceService;
  let agentGenerator: AgentGeneratorService;

  const mockIntelligenceService = {
    analyzeContextAndNotify: jest.fn(),
  };

  const mockAgentGenerator = {
    generateRandomAgent: jest.fn(),
  };

  const mockAgentRepo = {
    findByUserId: jest.fn(),
    deleteByUserId: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntelligenceController],
      providers: [
        { provide: IntelligenceService, useValue: mockIntelligenceService },
        { provide: AgentGeneratorService, useValue: mockAgentGenerator },
        { provide: AgentRepository, useValue: mockAgentRepo },
      ],
    }).compile();

    controller = module.get<IntelligenceController>(IntelligenceController);
    intelligenceService = module.get<IntelligenceService>(IntelligenceService);
    agentGenerator = module.get<AgentGeneratorService>(AgentGeneratorService);
  });

  const mockRequest = { user: { id: 'user-123' } };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call intelligenceService.analyzeContextAndNotify with user.id from request', async () => {
    const dto = { context: 'AI context' };
    await controller.trace(mockRequest, dto);
    expect(intelligenceService.analyzeContextAndNotify).toHaveBeenCalledWith('user-123', 'AI context');
  });

  it('should call agentGenerator.generateRandomAgent with user.id from request', async () => {
    await controller.generate(mockRequest, 'en-US');
    expect(agentGenerator.generateRandomAgent).toHaveBeenCalledWith('user-123', 'EN');
  });

  it('should call agentRepo methods on confirm with user.id from request', async () => {
    mockAgentRepo.findByUserId.mockResolvedValue({ id: 'existing-agent' });
    const agentData = { name: 'New Agent' };
    await controller.confirm(mockRequest, agentData);
    
    expect(mockAgentRepo.findByUserId).toHaveBeenCalledWith('user-123');
    expect(mockAgentRepo.deleteByUserId).toHaveBeenCalledWith('user-123');
    expect(mockAgentRepo.create).toHaveBeenCalled();
  });
});
