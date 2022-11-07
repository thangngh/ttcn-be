import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GoogleDto } from './dto/google-auth.dto';
import { UsersAuthDto } from './dto/users-auth.dto';
import { JWTAuthGuard } from './strategy/jwt-auth.guard';
@Controller('auth')
export class AuthController {

	constructor(public AuthServices: AuthService) { }

	@Post('login')
	async login(@Body(new ValidationPipe()) body: UsersAuthDto) {
		return await this.AuthServices.login(body);
	}

	@Post('register')
	async register(@Body(new ValidationPipe()) body: AuthCredentialsDto) {
		return await this.AuthServices.createUser(body);
	}

	@Post('loginWithGoogle')
	async loginWithGoogle(@Body(new ValidationPipe()) body: GoogleDto) {
		return await this.AuthServices.loginWithGoogle(body);
	}

	@UseGuards(JWTAuthGuard)
	@Get("/profile/get-role")
	async getRole(@Body(new ValidationPipe()) username: string) {
		return await this.AuthServices.getRoleUser(username);
	}

}
