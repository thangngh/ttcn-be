import { Module } from '@nestjs/common';
import { ShopperService } from './shopper.service';
import { ShopperController } from './shopper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shopper } from './entities/shopper.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shopper, User])
  ],
  controllers: [ShopperController],
  providers: [ShopperService]
})
export class ShopperModule { }
