import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogin, IRegister } from 'src/common/common.interface';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProviderType } from 'src/common/common.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import * as bcrypt from 'bcrypt';
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
			.andWhere('user.pass_word = :passWord', { passWord })
			.getOne();

		// check role
		console.log("user Login", user);

		this.getRoleUser({ userName, passWord }).then((data) => data);


		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		if (!(await user.checkPassword(passWord))) {
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

	async getRoleUser(payload: ILogin) {
		const { userName, passWord } = payload;
		const builder = this.userRepository.createQueryBuilder("user")
			.select()
			.leftJoinAndSelect('user.customer', 'customer')
			.leftJoinAndSelect('user.shipper', 'shipper')
			.leftJoinAndSelect('user.owner', 'owner')
			.leftJoinAndSelect('user.employee', 'employee')
			.where('user.userName = :userName', { userName })
			.andWhere('user.passWord = :passWord', { passWord })
			.getOne();

		return builder;
	}



	async createUser(body: IRegister) {
		const { fullName, email, userName, passWord, providerType = ProviderType.USERNAME } = body;

		const userDB = await this.userRepository.createQueryBuilder('user')
			.where('user.user_name = :userName', { userName: userName })
			.andWhere('user.email = :email', { email: email })
			.getOne();

		if (userDB.userName === userName) {
			throw new UnauthorizedException('Username already exists');
		}

		if (userDB.email === email) {
			throw new UnauthorizedException('Email already exists');
		}

		const passWordLength = passWord.length;

		if (passWordLength <= 8) {
			throw new UnauthorizedException(
				`Password must contain at least 8 characters`,
			);
		}

		if (!!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g.test(passWord) === false) {
			throw new UnauthorizedException(
				`Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character`,
			);
		}

		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(passWord, salt);
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
