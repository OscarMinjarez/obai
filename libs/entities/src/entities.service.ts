import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class EntitiesService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  constructor() {
    super({
      datasource: {
        url: process.env['DATABASE_URL'],
      },
    } as any);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

}
