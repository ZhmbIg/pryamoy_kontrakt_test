import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule],
  providers: [ClientsService],
  controllers: [ClientsController]
})
export class ClientsModule {}
