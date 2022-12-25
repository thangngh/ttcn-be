import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductDto {

	@IsNotEmpty()
	name!: string

	@IsNotEmpty()
	description!: string

	@IsNotEmpty()
	price!: number

	@IsNotEmpty()
	image?: string

	@IsOptional()
	quantity?: number

	@IsOptional()
	categoryid?: string
}
