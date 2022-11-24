import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from 'src/product-category/entities/product-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
