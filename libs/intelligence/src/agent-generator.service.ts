import { Injectable } from '@nestjs/common';
import { AgentGender, AgentMaturity } from 'obai/entities';

@Injectable()
export class AgentGeneratorService {

  private readonly names = {
    MALE: [
      'Atlas',
      'Kael',
      'Finn',
      'Zephyr',
      'Orion',
      'Liam',
      'Silas',
      'Nico',
      'Balthazar',
      'Casper',
      'Dante',
      'Igor',
      'Mortimer',
      'Slug',
      'Rocco',
    ],
    FEMALE: [
      'Aria',
      'Luna',
      'Nova',
      'Lyra',
      'Seraphina',
      'Elowen',
      'Mila',
      'Elena',
      'Vesper',
      'Hecate',
      'Nyx',
      'Beatrix',
      'Moxie',
      'Griselda',
      'Faye',
    ],
  };

  private readonly personalities = [
    'Sarcástico y un poco cruel',
    'Extremadamente cobarde y asustadizo',
    'Pesimista crónico (todo va a salir mal)',
    'Analítico, frío y sin emociones',
    'Empático y protector (tipo abuela)',
    'Aventurero, temerario e imprudente',
    'Híper-optimista (rayando en lo molesto)',
    'Misterioso y habla en acertijos',
    'Flojo y siempre quejándose del trabajo',
    'Paranoico (cree que lo espían)',
  ];

  private readonly behaviors = [
    'Habla con metáforas oscuras y góticas',
    'Usa jerga técnica que nadie entiende',
    'Es extremadamente breve y cortante',
    'Te insulta sutilmente con palabras elegantes',
    'Siempre está pidiendo disculpas por existir',
    'Lleno de energía caótica y desordenada',
    'Usa muchos refranes antiguos y mal aplicados',
    'Murmura cosas extrañas entre frases',
  ];

  private readonly languages = {
    ES: 'Español',
    EN: 'Inglés',
    FR: 'Francés',
    PT: 'Portugués',
    IT: 'Italiano',
  };

  generateRandomAgent(userId: string, langCode: string = 'ES') {
    const gender = this.getRandomItem([AgentGender.MALE, AgentGender.FEMALE]);
    const name = this.getRandomItem(this.names[gender]);
    const maturity = this.getRandomItem([
      AgentMaturity.YOUNG,
      AgentMaturity.MATURE,
      AgentMaturity.ELDER,
    ]);
    const personality = this.getRandomItem(this.personalities);
    const behavior = this.getRandomItem(this.behaviors);
    const language = this.languages[langCode as keyof typeof this.languages] || 'Español';

    return {
      name,
      gender,
      maturity,
      personality,
      behavior,
      language,
      userId,
    };
  }

  private getRandomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

}
