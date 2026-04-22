import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AgentsService } from './agents.service';
import { AgentRepository, AgentEntity } from 'obai/entities';
import { AgentGeneratorService } from 'obai/intelligence';

describe('AgentsService', () => {
  let service: AgentsService;

  const mockAgentRepo = {
    findByUserId: jest.fn<any>(),
    create: jest.fn<any>(),
    update: jest.fn<any>(),
  };

  const mockAgentGenerator = {
    generateRandomAgent: jest.fn<any>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentsService,
        { provide: AgentRepository, useValue: mockAgentRepo },
        { provide: AgentGeneratorService, useValue: mockAgentGenerator },
      ],
    }).compile();

    service = module.get<AgentsService>(AgentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMyAgent', () => {
    it('should return user agent', async () => {
      const mockAgent = { id: '1', name: 'Test' };
      mockAgentRepo.findByUserId.mockResolvedValue(mockAgent);
      
      const result = await service.getMyAgent('user-1');
      expect(result).toEqual(mockAgent);
      expect(mockAgentRepo.findByUserId).toHaveBeenCalledWith('user-1');
    });
  });

  describe('suggestAgent', () => {
    it('should call generator', async () => {
      const mockSuggestion = { name: 'Suggested' };
      mockAgentGenerator.generateRandomAgent.mockResolvedValue(mockSuggestion);
      
      const result = await service.suggestAgent('user-1', 'ES');
      expect(result).toEqual(mockSuggestion);
      expect(mockAgentGenerator.generateRandomAgent).toHaveBeenCalledWith('user-1', 'ES');
    });
  });

  describe('createAgent', () => {
    it('should create if not existing', async () => {
      mockAgentRepo.findByUserId.mockResolvedValue(null);
      const data = { name: 'New' };
      mockAgentRepo.create.mockResolvedValue({ id: '2', ...data });
      
      await service.createAgent('user-1', data);
      expect(mockAgentRepo.create).toHaveBeenCalledWith({ ...data, userId: 'user-1' });
    });

    it('should update if existing', async () => {
      const existing = { id: '1', name: 'Old' };
      mockAgentRepo.findByUserId.mockResolvedValue(existing);
      const data = { name: 'Updated' };
      mockAgentRepo.update.mockResolvedValue({ ...existing, ...data });
      
      await service.createAgent('user-1', data);
      expect(mockAgentRepo.update).toHaveBeenCalledWith(existing.id, data);
    });
  });
});
