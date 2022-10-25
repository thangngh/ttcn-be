import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogin, IRegister } from 'src/common/common.interface';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProviderType } from 'src/common/common.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
		public jwtService: JwtService,
	) { }

	async login(body: ILogin) {
		const { userName, passWord } = body;
		const user = await this.userRepository.createQueryBuilder('user')
			.where('user.userName = :userName', { userName })
			.andWhere('user.passWord = :passWord', { passWord })
			.getOne();
		// const providers = await this.userRepository.createQueryBuilder('user')
		// 	.select('user.providerType')
		// 	.where('user.userName = :userName', { userName })
		// 	.andWhere('user.passWord = :passWord', { passWord })
		// 	.getOne();
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		if (!(await user.checkPassword(passWord as string))) {
			throw new UnauthorizedException(
				`Wrong password for user with username: ${userName}`,
			);
		}

		const payload = { id: user.id, userName: user.userName };

		return {
			statusCode: HttpStatus.OK,
			message: 'Login successfully',
			accessToken: this.jwtService.sign(payload),
		};

	}

	async createUser(body: IRegister) {
		const { fullName, email, userName, passWord, providerType = ProviderType.USERNAME } = body;
		await this.userRepository.createQueryBuilder('users')
			.insert()
			.into(User)
			.values([
				{
					fullName,
					email,
					userName,
					passWord,
					providerType,
				},
			])
			.execute();

		return { status: HttpStatus.CREATED, content: 'Create user successful' };
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
