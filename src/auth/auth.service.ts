import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { enumRole, ILogin, IRegister } from 'src/common/common.interface';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProviderType } from 'src/common/common.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { GoogleDto } from './dto/google-auth.dto';
// import { FacebookDto } from './dto/facebook-auth.dto';
import { GoogleResponse } from './interface/google-response.interface';
import jwt_decode from 'jwt-decode';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		public userRepository: Repository<UserEntity>,
		public jwtService: JwtService,
		private mailerService: MailerService,
		private configService: ConfigService
	) { }

	async login(body: ILogin) {
		const { username, password } = body;
		const user = await this.userRepository.findOne({
			where: {
				username
			}
		});

		const isMatch = await user?.validatePassword(password as string);

		if (!isMatch || !user) {
			throw new HttpException('Wrong username or password', 401);
		}


		const payload = { id: user.id, username: user.username };

		return {
			statusCode: HttpStatus.OK,
			message: 'Login successfully',
			accessToken: this.jwtService.sign(payload),
		};

	}

	async loginWithGoogle(body: GoogleDto) {
		const { accessToken } = body;
		if (accessToken) {

			const decoded: GoogleResponse = await jwt_decode(accessToken);

			const user = await this.userRepository.createQueryBuilder('user')
				.where('user.email = :email', { email: decoded.email })
				.andWhere('user.providertype = :providertype', { providertype: ProviderType.GOOGLE })
				.getOne();

			if (user) {
				const payload = { id: user.id, username: user.username };
				return {
					statusCode: HttpStatus.OK,
					message: 'Login successfully',
					accessToken: this.jwtService.sign(payload),
				};
			}
			else {
				await this.createUser({
					firstname: decoded.family_name,
					lastname: decoded.given_name,
					username: decoded.email,
					email: decoded.email,
					avatar: decoded.picture,
					providertype: ProviderType.GOOGLE,
				})

				return {
					statusCode: HttpStatus.OK,
					message: 'Login successfully',
					accessToken: this.jwtService.sign({ userName: decoded.email }),
				};
			}


		}
	}

	// async loginWithFacebook(body: FacebookDto) {
	// 	const { accessToken, facebookAddress, name } = body;

	// 	const user = await this.userRepository.createQueryBuilder('user')
	// 		.where('user.email = :email', { email: facebookAddress })
	// 		.andWhere('user.provider_type = :providerType', { providerType: ProviderType.FACEBOOK })
	// 		.getOne();

	// 	if (user) {
	// 		const payload = { id: user.id, userName: user.userName };
	// 		return {
	// 			statusCode: HttpStatus.OK,
	// 			message: 'Login successfully',
	// 			accessToken: this.jwtService.sign(payload),
	// 		};
	// 	} else {
	// 		const nameSplit = name?.split(' ');
	// 		await this.createUser({
	// 			fullName: { firstName: nameSplit[0], lastName: nameSplit[1] },
	// 			userName: facebookAddress,
	// 			email: facebookAddress,
	// 			providerType: ProviderType.FACEBOOK,
	// 		})

	// 		return {
	// 			statusCode: HttpStatus.OK,
	// 			message: 'Login successfully',
	// 			accessToken: this.jwtService.sign({ userName: facebookAddress }),
	// 		};
	// 	}
	// }

	async createUser(body: IRegister) {
		const {
			firstname,
			lastname,
			email,
			username,
			password,
			providertype = ProviderType.USERNAME,
			role = enumRole.CUSTOMER,
			isactive = true,
		} = body;

		const userDB = await this.userRepository.createQueryBuilder('user')
			.where('user.username = :username', { username: username })
			.orWhere('user.email = :email', { email: email })
			.andWhere('user.providertype = :providertype', { providertype: providertype })
			.getOne();

		if (userDB?.username === username) {
			throw new HttpException(`Username ${username}  already exists`, HttpStatus.BAD_REQUEST);
		}

		if (userDB?.email === email) {
			throw new HttpException(`Email ${email}  already exists`, HttpStatus.BAD_REQUEST);
		}

		const passwordLength = password?.length;

		if (passwordLength <= 8 && password) {
			throw new UnauthorizedException(
				`Password must contain at least 8 characters`,
			);
		}

		if ((!!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g.test(password) === false) && password) {
			throw new UnauthorizedException(
				`Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character`,
			);
		}
		const passwordExits = password ? password : "unknown password";
		const userDTO = new UserEntity({
			firstname,
			lastname,
			email,
			username,
			password: passwordExits,
			providertype,
			roleid: role,
			isactive
		});

		await this.userRepository.createQueryBuilder('users')
			.insert()
			.into(UserEntity)
			.values(userDTO)
			.execute();

		return {
			status: HttpStatus.CREATED,
			content: 'Create user successful'
		};
	}

	async verifyPayload(payload: JwtPayload): Promise<UserEntity> {
		try {
			const builder = await this.userRepository.createQueryBuilder('user')
				.where('user.id = :id', { id: payload.id })
				.getOne();

			return builder;
		} catch (error) {
			throw new UnauthorizedException(`
				Unauthorized access with payload: ${JSON.stringify(payload.username)}
			`)
		}
	}

	async resetPassword(email: { email: string }) {
		console.log("email", email)
		const user = await this.userRepository.findOne({
			where: {
				email: email.email
			}
		})
		console.log(user)

		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

		const genToken = await this.jwtService.sign(email, {
			expiresIn: "300s"
		})

		this.mailerService.sendMail({
			to: email.email,
			subject: 'Reset your Password',
			template: 'reset-password',
			context: {
				resetLink:
					this.configService.get('FE_HOST') + `/change-password?token=${genToken}`,
				contact: 'thanngh.00@gmail.com',
			}
		})
	}

	async changePasswordWithVerifyToken(
		{
			token,
			password
		}: {
			token: string,
			password: string
		}) {
		const decoded: any = await jwt_decode(token)
		const user = await this.userRepository.findOne({
			where: {
				email: decoded.email
			}
		})

		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

		user.password = password

		await this.userRepository.save(user)

		return {
			status: HttpStatus.OK,
			content: 'Change password successful'
		}

	}

	async changePassword(
		{
			oldPassword,
			newPassword
		}: {
			oldPassword: string,
			newPassword: string
		},
		user: UserEntity) {
		const userDB = await this.userRepository.findOne({
			where: {
				id: user.id
			}
		})

		if (!userDB) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

		const isMatch = await userDB?.validatePassword(oldPassword)

		if (!isMatch) throw new HttpException('Old password is incorrect', HttpStatus.BAD_REQUEST);

		userDB.password = newPassword

		await this.userRepository.save(userDB)

		return {
			status: HttpStatus.OK,
			content: 'Change password successful'
		}
	}
}
