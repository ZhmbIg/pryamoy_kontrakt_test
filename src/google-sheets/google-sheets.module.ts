import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { ClientsService } from '../clients/clients.service';
import { GoogleSheetsController } from './google-sheets.controller';

@Module({
  imports: [],
  controllers:[GoogleSheetsController],
  providers: [GoogleSheetsService, ClientsService],
})
export class GoogleSheetsModule {}
