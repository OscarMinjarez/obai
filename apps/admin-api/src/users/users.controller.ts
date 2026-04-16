import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import RegisterUserRequest from './requests/register-user.request';
import { UserResponse } from './responses/user.response';

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
