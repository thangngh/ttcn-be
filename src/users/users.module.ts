import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Shopper } from 'src/shopper/entities/shopper.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Customer, Shopper]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
