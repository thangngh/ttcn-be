import { UserRole } from "src/common/common.interface";
import { IsEnum, IsNotEmpty } from "class-validator";
export class CreateShipperDto {

	@IsNotEmpty()
	@IsEnum(UserRole)
	role!: string;

	@IsNotEmpty()
	citizen_identification!: string;

	@IsNotEmpty()
	phone!: string;

	@IsNotEmpty()
	vehicle!: string;

	@IsNotEmpty()
	vehicle_type!: string;

	@IsNotEmpty()
	vehicle_color!: string;

}
