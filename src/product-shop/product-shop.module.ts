import { Module } from '@nestjs/common';
import { ProductShopService } from './product-shop.service';
import { ProductShopController } from './product-shop.controller';
import { ShopEntity } from 'src/shop/entities/shop.entity';
import { ProductShopEntity } from './entities/product-shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { ProductEntity } from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductShopEntity, ProductEntity, ShopEntity]),
    CategoryModule
  ],
  controllers: [ProductShopController],
  providers: [ProductShopService],
  exports: [ProductShopService]
})
export class ProductShopModule { }
