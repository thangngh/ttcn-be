import { IsString, IsNotEmpty } from 'class-validator';

export class UsersAuthDto {

	@IsString()
	@IsNotEmpty()
	userName: string;

	@IsString()
	@IsNotEmpty()
	passWord: string;
}