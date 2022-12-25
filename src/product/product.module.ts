import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductShopEntity } from 'src/product-shop/entities/product-shop.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { ProductShopModule } from 'src/product-shop/product-shop.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, ProductShopEntity]),
    ProductShopModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
