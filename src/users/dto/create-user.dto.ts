import { IsEnum, IsOptional, Matches } from "class-validator";
import { IAddress, IGender } from "src/common/common.interface";

export class CreateUserDto {

	@IsOptional()
	firstname?: string;

	@IsOptional()
	lastname?: string;

	@IsOptional()
	@IsEnum(IGender)
	gender?: IGender;

	@IsOptional()
	address?: IAddress;

	@IsOptional()
	phone?: string;

	@IsOptional()
	email?: string;

	@IsOptional()
	username?: string;

	@IsOptional()
	@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
		message:
			'Password must includes lowercase, uppercase, number and special character',
	})
	password?: string;

	@IsOptional()
	avatar?: string;

}
