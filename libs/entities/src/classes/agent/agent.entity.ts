import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

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

  @IsUUID()
  userId: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<AgentEntity>) {
    Object.assign(this, partial);
  }

}
