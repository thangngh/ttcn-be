import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ShopperModule } from './shopper/shopper.module';
import { UsersessionhistoryModule } from './usersessionhistory/usersessionhistory.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ProductCategoryModule } from './product-category/product-category.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule,
    CustomerModule,
    AdminModule,
    AuthModule,
    ShopperModule,
    UsersessionhistoryModule,
    ProductModule,
    CategoryModule,
    ProductCategoryModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
