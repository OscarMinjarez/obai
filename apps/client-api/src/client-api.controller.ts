import { Controller, Get } from '@nestjs/common';
import { ClientApiService } from './client-api.service.js';

@Controller()
export class ClientApiController {

  constructor(private readonly clientApiService: ClientApiService) {}

  @Get()
  getHello(): string {
    return this.clientApiService.getHello();
  }

}
