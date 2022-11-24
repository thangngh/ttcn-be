import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import { Shopper } from 'src/shopper/entities/shopper.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, User, Shopper])
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }
