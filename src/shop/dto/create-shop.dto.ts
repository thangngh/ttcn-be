import { IsNotEmpty, IsOptional } from "class-validator";
import { IAddress } from "src/common/common.interface";

export class CreateShopDto {

	@IsNotEmpty()
	name!: string;

	@IsOptional()
	address?: IAddress;

	@IsOptional()
	phone?: string;

	@IsOptional()
	email?: string;

	@IsNotEmpty()
	description!: string;

	@IsNotEmpty()
	isActive!: boolean;

	@IsNotEmpty()
	userid!: string;
}
