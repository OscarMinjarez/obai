import { IsString, IsNotEmpty, IsUUID, IsEnum } from 'class-validator';

export enum AgentGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum AgentMaturity {
  YOUNG = 'YOUNG',
  MATURE = 'MATURE',
  ELDER = 'ELDER',
}

export class AgentEntity {

  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(AgentGender)
  gender: AgentGender;

  @IsEnum(AgentMaturity)
  maturity: AgentMaturity;

  @IsString()
  personality: string;

  @IsString()
  behavior: string;

  @IsString()
  language: string;

  @IsUUID()
  userId: string;

  constructor(partial: Partial<AgentEntity>) {
    Object.assign(this, partial);
  }

}
