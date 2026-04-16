import { Injectable, Logger } from '@nestjs/common';
import { DeviceRepository, AgentEntity, AgentGender, AgentMaturity } from 'obai/entities';
import { DeviceResponse } from '../devices/responses/device.response';
import { AiIntelligenceService } from 'obai/intelligence';
import { AgentRepository } from 'obai/entities/classes/agent/agent.repository';

@Injectable()
export class IntelligenceService {

  private readonly logger = new Logger(IntelligenceService.name);

  constructor(
    private readonly deviceRepo: DeviceRepository,
    private readonly agentRepo: AgentRepository,
    private readonly aiService: AiIntelligenceService,
  ) {}

  async findTargetDevice(userId: string): Promise<DeviceResponse | null> {
    const activeDevice = await this.deviceRepo.findMostRecentByUserId(userId);
    if (!activeDevice) {
      return null;
    }
    return new DeviceResponse(activeDevice as any);
  }

  async analyzeContextAndNotify(userId: string, context: string): Promise<void> {
    const target = await this.findTargetDevice(userId);
    if (!target) {
      this.logger.warn(
        `No active device found for user ${userId}. Proactive notification skipped.`,
      );
      return;
    }
    try {
      let agent = await this.agentRepo.findByUserId(userId);
      if (!agent) {
        agent = new AgentEntity({
          name: 'Obai Base',
          gender: AgentGender.MALE,
          maturity: AgentMaturity.MATURE,
          personality: 'Útil y neutral',
          behavior: ['Profesional'],
          userId,
        });
      }
      const aiMessage = await this.aiService.analyzeContext(context, agent);
      this.logger.log(
        `OBAI PROACTIVE [Agent: ${agent.name}] [Device: ${target.name}]: ${aiMessage}`,
      );
    } catch (error) {
      this.logger.error('Error in proactive AI orchestration', error);
    }
  }

}
