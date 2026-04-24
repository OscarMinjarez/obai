import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import RegisterUserRequest from './requests/register-user.request.js';
import { UserResponse } from './responses/user.response.js';

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
