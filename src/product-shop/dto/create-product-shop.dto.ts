import { IsNotEmpty } from "class-validator";

export class CreateProductShopDto {

	@IsNotEmpty()
	shopid: string;

	@IsNotEmpty()
	productid!: string;
}
