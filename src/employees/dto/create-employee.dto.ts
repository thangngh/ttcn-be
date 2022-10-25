import { UserRole } from "src/common/common.interface";
import { IsEnum, IsNotEmpty } from "class-validator";
export class CreateEmployeeDto {

	@IsNotEmpty()
	@IsEnum(UserRole)
	role!: string;

	@IsNotEmpty()
	citizen_identification!: string;

	@IsNotEmpty()
	hourWorked!: number;

	@IsNotEmpty()
	rating!: number;

	@IsNotEmpty()
	salary!: number;

	@IsNotEmpty()
	timeOff!: number;

}
