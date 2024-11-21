import { Controller, Get, Headers } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {

  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  @Get('save-clients')
  async saveClientsToGoogleSheet(@Headers('Authorization') authToken: string) {
    try {
      await this.googleSheetsService.saveClientsToGoogleSheet(authToken);
      return { message: 'Clients data saved to Google Sheets successfully' };
    } catch (error) {
      return { message: 'Error saving clients data to Google Sheets', error: error.message };
    }
  }
}
