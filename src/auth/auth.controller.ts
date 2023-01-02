import { Body, Controller, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/users/user.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// import { FacebookDto } from './dto/facebook-auth.dto';
import { GoogleDto } from './dto/google-auth.dto';
import { UsersAuthDto } from './dto/users-auth.dto';
// import { JWTAuthGuard } from './strategy/jwt-auth.guard';
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

	// @Post('loginWithFacebook')
	// async loginWithFacebook(@Body(new ValidationPipe()) body: FacebookDto) {
	// 	return await this.AuthServices.loginWithFacebook(body);
	// }

	@Post("/reset-password")
	async resetPassword(@Body(new ValidationPipe()) body: string) {
		return await this.AuthServices.resetPassword(body);
	}

	@Patch("/change-password-with-verify-token")
	async changePasswordWithVerifyToken(@Body(new ValidationPipe()) body: { password: string, token: string }) {
		return await this.AuthServices.changePasswordWithVerifyToken(body);
	}

	@Patch("/change-password")
	// @UseGuards(JWTAuthGuard)
	async changePassword(@Body(new ValidationPipe()) body: { oldPassword: string, newPassword: string }, @AuthUser() user: UserEntity) {
		return await this.AuthServices.changePassword(body, user);
	}
}
