import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersessionhistoryDto } from './create-usersessionhistory.dto';

export class UpdateUsersessionhistoryDto extends PartialType(CreateUsersessionhistoryDto) {}
