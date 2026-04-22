import { Test, TestingModule } from '@nestjs/testing';
import { AiIntelligenceService } from './intelligence.service';
import { AgentEntity, AgentGender, AgentMaturity } from 'obai/entities';
import { GoogleGenAI } from '@google/genai';

jest.mock('@google/genai');

describe('AiIntelligenceService', () => {
  let service: AiIntelligenceService;

  const mockAgent = new AgentEntity({
    name: 'Atlas',
    personality: 'Sarcastic',
    behavior: ['Witty'],
    maturity: 'YOUNG',
    gender: 'MALE',
    language: 'Spanish',
  });

  const mockGenerateContent = jest.fn().mockResolvedValue({
    text: 'Hola, soy Atlas.',
  });

  beforeEach(async () => {
    (GoogleGenAI as jest.Mock).mockImplementation(() => ({
      models: {
        generateContent: mockGenerateContent,
      },
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [AiIntelligenceService],
    }).compile();

    service = module.get<AiIntelligenceService>(AiIntelligenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call Gemini with the correct localized prompt', async () => {
    const context = 'User is drinking coffee';
    const result = await service.analyzeContext(context, mockAgent);

    expect(result).toBe('Hola, soy Atlas.');
    expect(mockGenerateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gemini-3.1-flash-lite-preview',
        contents: expect.arrayContaining([
          expect.objectContaining({
            parts: expect.arrayContaining([
              expect.objectContaining({
                text: expect.stringContaining('Eres Atlas'),
              }),
            ]),
          }),
        ]),
      }),
    );
  });
});
