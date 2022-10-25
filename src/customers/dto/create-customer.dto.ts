import {
	IsNotEmpty,
	IsEnum,
} from 'class-validator';
import { UserRole } from 'src/common/common.interface';

export class CreateCustomerDto {

	@IsNotEmpty()
	@IsEnum(UserRole)
	role!: string;
}
