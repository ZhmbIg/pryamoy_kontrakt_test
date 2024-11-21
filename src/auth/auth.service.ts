import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios'
import { ConfigService } from '@nestjs/config';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {

    private readonly apiBaseUrl: string;

    constructor(private readonly configService: ConfigService) {
        this.apiBaseUrl = this.configService.get<string>('API_BASE_URL')
    }

    async registerUser(username: string, password: string): Promise<void> {
        try {
            const url = `${this.apiBaseUrl}/auth/registration`;
            await axios.post(url, {username, password});
        } catch (error) {
            throw new HttpException(
                error.response?.data?.message || 'Faild to register user',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async loginUser(username: string, password: string): Promise<string>{
        try {
            const url = `${this.apiBaseUrl}/auth/login`;
            const response = await axios.post(url, {username, password});
            return response.data.token;
        } catch (error) {
            throw new HttpException(
                error.response?.data?.message || 'Faild to login',
                HttpStatus.UNAUTHORIZED,
            );
        }
    }
}
