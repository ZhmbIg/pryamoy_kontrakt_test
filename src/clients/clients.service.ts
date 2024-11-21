import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import axios from 'axios';


@Injectable()
export class ClientsService {

    private readonly apiBaseUrl: string;

    constructor(private readonly configService: ConfigService) {
        this.apiBaseUrl = this.configService.get<string>('API_BASE_URL')
    }

    async getClients(authToken: string, limit = 5, offset = 0): Promise<any[]> {
        try {
            const url = `${this.apiBaseUrl}/clients?limit=${limit}&offset=${offset}`;
            const cleanAuthToken = authToken.split(' ')[1];
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `${cleanAuthToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching clients:', error.response?.data || error.message);
            throw new HttpException(
                error.response?.data?.message || 'Failed to fetch clients',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getClientsStatus(authToken: string, userIds: number[]): Promise<any[]> {
        try {
            const url = `${this.apiBaseUrl}/clients`;
            const cleanAuthToken = authToken.split(' ')[1];
            const response = await axios.post(
                url,
                { userIds },
                {
                    headers: {
                        'Authorization': `${cleanAuthToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            )
            return response.data
        } catch (error) {
            console.error('Error fetching clients statuses:', error.response?.data || error.message);
            throw new HttpException(
                error.response?.data?.message || 'Failed to fetch clients statuses',
                HttpStatus.BAD_REQUEST,
        )}
    }

    async getClientsAndStatuses(authToken: string, limit = 5, offset = 0): Promise<any[]> {
        try {
            const clients = await this.getClients(authToken, limit, offset);
            const userIds = clients.map(client => client.id);
            const statuses = await this.getClientsStatus(authToken, userIds);
            const clientsWithStatuses = clients.map((client, index) => ({
                ...client,
                status: statuses[index]?.status || 'No status',
            }));
    
            return clientsWithStatuses;
        } catch (error) {
            console.error('Error fetching clients and statuses:', error.message);
            throw new Error('Failed to fetch clients and statuses');
        }
    }
    
}
