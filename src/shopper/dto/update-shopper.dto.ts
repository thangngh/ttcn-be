import { PartialType } from '@nestjs/mapped-types';
import { CreateShopperDto } from './create-shopper.dto';

export class UpdateShopperDto extends PartialType(CreateShopperDto) {}
