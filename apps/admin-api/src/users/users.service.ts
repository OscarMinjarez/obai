import { Injectable } from '@nestjs/common';
import { EntitiesService } from 'obai/entities';
import RegisterUserRequest from './requests/register-user.request';
import { UserResponse } from './responses/user.response';

@Injectable()
export class UsersService {

  constructor(private readonly entitiesService: EntitiesService) {}

  async findActiveUsers(): Promise<UserResponse[]> {
    const users = await this.entitiesService.user.findMany({
      where: { isActive: true },
    });
    return users.map((user) => new UserResponse(user));
  }

  async create(user: RegisterUserRequest): Promise<UserResponse> {
    const created = await this.entitiesService.user.create({ data: user });
    return new UserResponse(created);
  }

}
