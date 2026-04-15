import { Test, TestingModule } from '@nestjs/testing';
import { AgentGeneratorService } from './agent-generator.service';
import { GoogleGenAI } from '@google/genai';

jest.mock('@google/genai');

describe('AgentGeneratorService', () => {
  let service: AgentGeneratorService;

  const mockAgentData = {
    name: 'Kael',
    gender: 'MALE',
    maturity: 'YOUNG',
    personality: 'Mysterious',
    behavior: 'Silent',
    language: 'English',
  };

  const mockGenerateContent = jest.fn().mockResolvedValue({
    text: JSON.stringify(mockAgentData),
  });

  beforeEach(async () => {
    (GoogleGenAI as jest.Mock).mockImplementation(() => ({
      models: {
        generateContent: mockGenerateContent,
      },
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentGeneratorService],
    }).compile();

    service = module.get<AgentGeneratorService>(AgentGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a random agent identity via Gemini', async () => {
    const result = await service.generateRandomAgent('user-123', 'EN');

    expect(result.name).toBe('Kael');
    expect(result.userId).toBe('user-123');
    expect(mockGenerateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gemini-2.0-flash-lite',
        contents: expect.arrayContaining([
          expect.objectContaining({
            parts: expect.arrayContaining([
              expect.objectContaining({
                text: expect.stringContaining('locale "EN"'),
              }),
            ]),
          }),
        ]),
      }),
    );
  });
});
