import {
	IsEnum,
	IsOptional,
} from 'class-validator';
import { UserRole } from 'src/common/common.interface';

export class CreateCustomerDto {

	@IsOptional()
	@IsEnum(UserRole)
	role?: string;

	@IsOptional()
	userId?: string;
}
