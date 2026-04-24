import { Injectable } from '@nestjs/common';
import { EntitiesService } from 'obai/entities/entities.service.js';
import RegisterUserRequest from './requests/register-user.request.js';
import { UserResponse } from './responses/user.response.js';

@Injectable()
export class UsersService {

  constructor(private readonly entitiesService: EntitiesService) {}

  private get userDelegate() {
    return (this.entitiesService as EntitiesService & { user: any }).user;
  }

  async findActiveUsers(): Promise<UserResponse[]> {
    const users = await this.userDelegate.findMany({
      where: { isActive: true },
    });
    return users.map((user) => new UserResponse({ ...user, name: user.name ?? undefined }));
  }

  async create(user: RegisterUserRequest): Promise<UserResponse> {
    const created = await this.userDelegate.create({ data: user });
    return new UserResponse({ ...created, name: created.name ?? undefined });
  }

}
