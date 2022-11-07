import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogin, IRegister } from 'src/common/common.interface';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProviderType } from 'src/common/common.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import * as bcrypt from 'bcrypt';
import { GoogleDto } from './dto/google-auth.dto';
import { FacebookDto } from './dto/facebook-auth.dto';
import { GoogleResponse } from './interface/google-response.interface';
import jwt_decode from 'jwt-decode';
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
		public jwtService: JwtService,
		public customerService: CustomersService,
	) { }

	async login(body: ILogin) {
		const { userName, passWord } = body;
		const user = await this.userRepository.createQueryBuilder('user')
			.where('user.user_name = :userName', { userName })
			.getOne();


		if (((await user?.checkPassword(passWord)) === false) || !user) {
			throw new UnauthorizedException(
				`Wrong password or username`,
			);
		}


		const payload = { id: user.id, userName: user.userName };

		return {
			statusCode: HttpStatus.OK,
			message: 'Login successfully',
			accessToken: this.jwtService.sign(payload),
		};

	}

	async loginWithGoogle(body: GoogleDto) {
		const { accessToken, googleAddress } = body;
		if (accessToken) {
			const decoded: GoogleResponse = await jwt_decode(accessToken);
			console.log(decoded)
			const user = await this.userRepository.createQueryBuilder('user')
				.where('user.email = :email', { email: decoded.email })
				.andWhere('user.provider_type = :providerType', { providerType: ProviderType.GOOGLE })
				.getOne();

			if (user) {
				const payload = { id: user.id, userName: user.userName };
				return {
					statusCode: HttpStatus.OK,
					message: 'Login successfully',
					accessToken: this.jwtService.sign(payload),
				};
			} else {
				const nameSplit = decoded.name?.split(' ');
				await this.createUser({
					fullName: { firstName: nameSplit[1], lastName: nameSplit[0] },
					userName: decoded.email,
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

	// async loginWithFacebook(body: FacebookDto) { }

	async getRoleUser(userName: string) {
		const builder = await this.userRepository.createQueryBuilder("user")
			.select([
				"user.id", 'customer.role', 'owner.role', 'shipper.role', 'employee.role'
			])
			.leftJoinAndSelect('user.customer', 'customer')
			.leftJoinAndSelect('user.shipper', 'shipper')
			.leftJoinAndSelect('user.owner', 'owner')
			.leftJoinAndSelect('user.employee', 'employee')
			.where('user.userName = :userName', { userName })
			.getOne();

		return {
			id: builder.id,
			role: {
				customer: builder.customer?.role || null,
				owner: builder.owner?.role || null,
				shipper: builder.shipper?.role || null,
				employee: builder.employee?.role || null,
			}
		};
	}

	async createUser(body: IRegister) {
		const { fullName, email, userName, passWord, providerType = ProviderType.USERNAME } = body;

		const userDB = await this.userRepository.createQueryBuilder('user')
			.where('user.user_name = :userName', { userName: userName })
			.orWhere('user.email = :email', { email: email })
			.andWhere('user.provider_type = :providerType', { providerType: providerType })
			.getOne();

		if (userDB?.userName === userName) {
			throw new HttpException(`Username ${userName}  already exists`, HttpStatus.BAD_REQUEST);
		}

		if (userDB?.email === email) {
			throw new HttpException(`Email ${email}  already exists`, HttpStatus.BAD_REQUEST);
		}

		const passWordLength = passWord?.length;

		if (passWordLength <= 8 && passWord) {
			throw new UnauthorizedException(
				`Password must contain at least 8 characters`,
			);
		}

		if ((!!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g.test(passWord) === false) && passWord) {
			throw new UnauthorizedException(
				`Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character`,
			);
		}

		const salt = await bcrypt.genSalt();
		const hash = passWord ? await bcrypt.hash(passWord, salt) : "unknown password";
		const user = await this.userRepository.createQueryBuilder('users')
			.insert()
			.into(User)
			.values([
				{
					fullName,
					email,
					userName,
					passWord: hash,
					providerType,
				},
			])
			.execute();
		const userId = user.identifiers[0].id

		// add user into customer table
		await this.customerService.create({ userId });

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
				Unauthorized access with payload: ${JSON.stringify(payload.useName)}
			`)
		}

	}
}
