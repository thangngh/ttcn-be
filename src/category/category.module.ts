import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { ProductCategory } from 'src/product-category/entities/product-category.entity';

@Module({
  imports: [Category, ProductCategory],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
