import { IsString } from "class-validator";

export class GetUserDto {
	@IsString()
	accessToken!: string;
}