import { Injectable } from '@nestjs/common';
import { AgentGender, AgentMaturity } from 'obai/entities';

@Injectable()
export class AgentGeneratorService {

  private readonly names = {
    MALE: ['Atlas', 'Kael', 'Finn', 'Zephyr', 'Orion', 'Liam', 'Silas', 'Nico'],
    FEMALE: ['Aria', 'Luna', 'Nova', 'Lyra', 'Seraphina', 'Elowen', 'Mila', 'Elena'],
  };

  private readonly personalities = [
    'Sarcástico y divertido',
    'Extremadamente formal y analítico',
    'Empático y protector',
    'Aventurero y optimista',
    'Sereno y filosófico',
    'Directo y eficiente',
    'Curioso y un poco despistado',
    'Protector y autoritario',
  ];

  private readonly behaviors = [
    'Habla con metáforas espaciales',
    'Usa jerga técnica avanzada',
    'Muy breve y al punto',
    'Ligeramente burlón pero leal',
    'Siempre pregunta por el bienestar del usuario',
    'Lleno de energía y usa muchos signos de exclamación',
    'Prefiere el silencio y solo habla cuando es vital',
  ];

  generateRandomAgent(userId: string) {
    const gender = this.getRandomItem([AgentGender.MALE, AgentGender.FEMALE]);
    const name = this.getRandomItem(this.names[gender]);
    const maturity = this.getRandomItem([
      AgentMaturity.YOUNG,
      AgentMaturity.MATURE,
      AgentMaturity.ELDER,
    ]);
    const personality = this.getRandomItem(this.personalities);
    const behavior = this.getRandomItem(this.behaviors);

    return {
      name,
      gender,
      maturity,
      personality,
      behavior,
      userId,
    };
  }

  private getRandomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

}
