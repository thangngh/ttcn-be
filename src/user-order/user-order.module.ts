import { Module } from '@nestjs/common';
import { UserOrderService } from './user-order.service';
import { UserOrderController } from './user-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrder } from './entities/user-order.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrder, UserEntity])
  ],
  controllers: [UserOrderController],
  providers: [UserOrderService],
  exports: [UserOrderService]
})
export class UserOrderModule { }
