import { Injectable } from '@nestjs/common';
import { EntitiesService, UserEntity } from 'obai/entities';

@Injectable()
export class UsersService {

  constructor(private readonly entitiesService: EntitiesService) {}

  async findActiveUsers(): Promise<UserEntity[]> {
    const users = await this.entitiesService.user.findMany({
      where: {
        isActive: true,
      },
    });
    return users.map((user) => new UserEntity(user));
  }

}
