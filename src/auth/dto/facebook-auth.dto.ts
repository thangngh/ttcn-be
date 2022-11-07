import { IsOptional } from "class-validator";

export class FacebookDto {

	@IsOptional()
	accessToken!: string;

	@IsOptional()
	facebookAddress!: string;

	@IsOptional()
	name!: string;
}