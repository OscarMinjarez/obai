import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export enum AgentGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY'
}

export enum AgentMaturity {
  YOUNG = 'YOUNG',
  MATURE = 'MATURE',
  ELDER = 'ELDER'
}

export class AgentEntity {

  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  maturity: string;

  @IsString()
  personality: string;

  @IsString({ each: true })
  behaviors: string[];

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsUUID()
  userId: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<AgentEntity>) {
    Object.assign(this, partial);
  }

}
