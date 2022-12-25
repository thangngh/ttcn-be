import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AuthUser } from 'src/users/user.decorator';
import { JWTAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @UseGuards(JWTAuthGuard)
  @Post("/create-shop/onwer")
  create(@Body() createShopDto: CreateShopDto, @AuthUser() user) {
    return this.shopService.create(createShopDto, user);
  }

  @UseGuards(JWTAuthGuard)
  @Get("/get-shop/onwer")
  getShopByUser(@AuthUser() user) {
    return this.shopService.getShopByUser(user);
  }
}
