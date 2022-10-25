import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersAuthDto } from './dto/users-auth.dto';
// import { JWTAuthGuard } from './strategy/jwt-auth.guard';
@Controller('auth')
export class AuthController {

	constructor(public AuthServices: AuthService) { }

	@Post('login')
	async login(@Body() body: UsersAuthDto) {
		return await this.AuthServices.login(body);
	}

	// @UseGuards(JWTAuthGuard)
	@Post('register')
	async register(@Body(new ValidationPipe()) body: AuthCredentialsDto) {
		return await this.AuthServices.createUser(body);
	}
}