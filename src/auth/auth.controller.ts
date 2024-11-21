import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body:{username: string, password: string}){
        await this.authService.registerUser(body.username, body.password)
        return {message: 'User registered successfully'}
    }

    @Post('login')
    async login(@Body() body: {username: string, passwrod: string}){
        const token = await this.authService.loginUser(body.username, body.passwrod)
        return {token}
    }
}
