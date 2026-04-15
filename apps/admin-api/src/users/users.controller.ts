import { UserEntity } from 'obai/entities';
import RegisterUserRequest from './requests/register-user.request';
import { UserResponse } from './responses/user.response';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findActiveUsers();
  }

  @Post()
  async create(@Body() user: RegisterUserRequest): Promise<UserResponse> {
    return this.usersService.create(user);
  }

}
