import { IsOptional } from "class-validator";

export class GoogleDto {

	@IsOptional()
	accessToken!: string;

}