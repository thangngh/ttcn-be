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

	@IsNotEmpty()
	@IsEnum(ISex)
	sex!: ISex;

	@IsNotEmpty()
	address!: IAddress;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	phone!: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	userName!: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	password!: string;

	@IsOptional()
	@IsString()
	securityCode!: string;

	@IsOptional()
	avatarPath!: string;

	@IsOptional()
	avatarThumbnailPath!: string;
}
