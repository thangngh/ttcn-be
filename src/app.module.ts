import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';
import { ProductShopModule } from './product-shop/product-shop.module';
import { UserOrderModule } from './user-order/user-order.module';
import { PaymentModule } from './payment/payment.module';
import { UserPaymentModule } from './user-payment/user-payment.module';
import { EmailModule } from './email/email.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RoleModule,
    ProductModule,
    CategoryModule,
    ShopModule,
    ProductShopModule,
    UserOrderModule,
    PaymentModule,
    UserPaymentModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
