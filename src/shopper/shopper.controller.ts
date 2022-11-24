import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopperService } from './shopper.service';
import { CreateShopperDto } from './dto/create-shopper.dto';
import { UpdateShopperDto } from './dto/update-shopper.dto';

@Controller('shopper')
export class ShopperController {
  constructor(private readonly shopperService: ShopperService) { }

  @Patch('/update-shopper/:userId')
  update(@Param('userId') userId: string, @Body() updateShopperDto: UpdateShopperDto) {
    return this.shopperService.update(userId, updateShopperDto);
  }

}
