import { IsOptional } from "class-validator";

export class GoogleDto {

	@IsOptional()
	accessToken!: string;

	@IsOptional()
	googleAddress!: string;
}