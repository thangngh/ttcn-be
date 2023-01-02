import { IsOptional, IsString } from "class-validator";

export class CreatePaymentDto {

	@IsString()
	type: string;

	@IsString()
	name: string;


	@IsOptional()
	createdat: Date;
}
