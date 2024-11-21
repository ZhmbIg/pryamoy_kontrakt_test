import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async getClients(@Headers('Authorization') authToken: string) {
    const clients = await this.clientsService.getClients(authToken);
    if (!authToken) {
        throw new Error('Authorization token is required');
      }
    return { clients };
  }

  @Post('statuses')
  async getClientsStatus(
    @Body() body: { userIds: number[] },
    @Headers('Authorization') authToken: string,
  ) {
    if (!authToken) {
      throw new Error('Authorization token is required');
    }
    const clientStatuses = await this.clientsService.getClientsStatus(authToken, body.userIds);
    return { clientStatuses };
  }
}

