import { IsString, IsUUID } from 'class-validator';

export class UserEntity {

  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

}
