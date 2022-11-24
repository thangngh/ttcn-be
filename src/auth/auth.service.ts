import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogin, IRegister } from 'src/common/common.interface';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProviderType } from 'src/common/common.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { GoogleDto } from './dto/google-auth.dto';
// import { FacebookDto } from './dto/facebook-auth.dto';
import { GoogleResponse } from './interface/google-response.interface';
import jwt_decode from 'jwt-decode';
import { Customer } from 'src/customer/entities/customer.entity';
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
		public jwtService: JwtService,
		@InjectRepository(Customer)
		public customerRepository: Repository<Customer>,
	) { }

	async login(body: ILogin) {
		const { username, password } = body;
		const user = await this.userRepository.findOne({
			where: {
				username
			},
			relations: ['customer', 'shopper']

		});

		const isMatch = await user.checkPassword(password as string);

		if (!isMatch || !user) {
			throw new HttpException('Wrong username or password', 401);
		}


		const payload = { id: user.id, username: user.username };

		return {
			statusCode: HttpStatus.OK,
			message: 'Login successfully',
			data: user,
			accessToken: this.jwtService.sign(payload),
		};

	}

	async loginWithGoogle(body: GoogleDto) {
		const { accessToken, googleAddress } = body;
		if (accessToken) {

			const decoded: GoogleResponse = await jwt_decode(accessToken);

			const user = await this.userRepository.createQueryBuilder('user')
				.where('user.email = :email', { email: decoded.email })
				.andWhere('user.providerType = :providerType', { providerType: ProviderType.GOOGLE })
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
				const nameSplit = decoded.name?.split(' ');
				await this.createUser({
					fullName: { firstName: nameSplit[1], lastName: nameSplit[0] },
					username: decoded.email,
					email: decoded.email,
					providerType: ProviderType.GOOGLE,
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
		const { fullName, email, username, password, providerType = ProviderType.USERNAME } = body;

		const userDB = await this.userRepository.createQueryBuilder('user')
			.where('user.username = :username', { username: username })
			.orWhere('user.email = :email', { email: email })
			.andWhere('user.providerType = :providerType', { providerType: providerType })
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

		const userDTO = new User({ fullName, email, username, password: passwordExits, providerType });

		const user = await this.userRepository.createQueryBuilder('users')
			.insert()
			.into(User)
			.values(userDTO)
			.execute();
		const userId = user.identifiers[0].id

		// add user into customer table
		await this.customerRepository.save({
			userId
		})

		delete (user.identifiers[0].passWord);

		return {
			status: HttpStatus.CREATED,
			content: 'Create user successful'
		};
	}

	async verifyPayload(payload: JwtPayload): Promise<User> {
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
}
