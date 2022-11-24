import {
	IsString,
	IsNotEmpty,
	IsEmail,
	MinLength,
	MaxLength,
	IsEnum,
	IsOptional
} from 'class-validator';
import { IAddress, IFullName, ISex } from 'src/common/common.interface';


export class CreateUserDto {

	@IsNotEmpty()
	fullName!: IFullName;

	@IsOptional()
	@IsEnum(ISex)
	gender?: ISex;

	@IsOptional()
	address?: IAddress;

	@IsOptional()
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	phone?: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	username!: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	password!: string;

	@IsOptional()
	@IsString()
	securityCode?: string;

	@IsOptional()
	avatarPath?: string;

	@IsOptional()
	avatarThumbnailPath?: string;
}
