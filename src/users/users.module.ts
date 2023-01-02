import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { ShopEntity } from 'src/shop/entities/shop.entity';
import { UserOrder } from 'src/user-order/entities/user-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, ShopEntity, UserOrder]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
