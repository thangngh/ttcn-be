import { UserRole } from "src/common/common.interface";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateOwnerDto {

	@IsNotEmpty()
	@IsEnum(UserRole)
	role!: string;
}
