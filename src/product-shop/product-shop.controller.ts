import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductShopService } from './product-shop.service';

@Controller('product-shop')
export class ProductShopController {
  constructor(private readonly productShopService: ProductShopService) { }

  @Get("/all-product-shop")
  findAllProductShop() {
    return this.productShopService.findAllProductShop();
  }

  @Get("/product-with-shop/:shopid")
  findProductWithShop(@Param("shopid") shopid: string) {
    return this.productShopService.findProductWithShop(shopid);
  }

  @Patch("/update-product-shop/:productid")
  updateProductShop(@Param('productid') productid: string, @Body() updateProductShopDto: UpdateProductDto) {
    return this.productShopService.updateProductShop(productid, updateProductShopDto);
  }

}
