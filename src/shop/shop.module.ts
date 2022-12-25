import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './entities/shop.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductShopEntity } from 'src/product-shop/entities/product-shop.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopEntity, UserEntity, ProductShopEntity, CategoryEntity])
  ],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule { }
