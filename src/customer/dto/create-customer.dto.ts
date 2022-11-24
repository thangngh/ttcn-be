import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { UserRole } from "src/common/common.interface";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateCustomerDto extends CreateUserDto {

	@IsOptional()
	@IsEnum(UserRole)
	role?: UserRole;
}
