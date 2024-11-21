import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ClientsService } from '../clients/clients.service';
import { ConfigService } from '@nestjs/config';
import { JWT } from 'google-auth-library';

@Injectable()
export class GoogleSheetsService {
  private readonly sheets = google.sheets({ version: 'v4' });
  private readonly spreadsheetId: string;
  private readonly auth: JWT;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly configService: ConfigService,
  ) {
    this.spreadsheetId = this.configService.get<string>('SPREADSHEET_ID');

    this.auth = new JWT({
      keyFile: './config.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  async saveClientsToGoogleSheet(authToken: string, limit = 1000, offset = 0): Promise<void> {
    try {
      const clientsWithStatuses = await this.clientsService.getClientsAndStatuses(authToken, limit, offset);
      const values = clientsWithStatuses.map(client => [
        client.id,
        client.firstName,
        client.lastName,
        client.gender,
        client.address,
        client.city,
        client.phone,
        client.email,  
        client.status, 
      ]);

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A2',
        valueInputOption: 'RAW',
        requestBody: {
          values,
        },
        auth: this.auth,
      });

      console.log('Data successfully written to Google Sheets');
    } catch (error) {
      console.error('Error writing data to Google Sheets:', error.message);
      throw new Error('Failed to write data to Google Sheets');
    }
  }
}
