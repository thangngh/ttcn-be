import { IsString, IsNotEmpty } from 'class-validator';

export class UsersAuthDto {

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}