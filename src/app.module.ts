import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { OwnersModule } from './owners/owners.module';
import { AdminModule } from './admin/admin.module';
import { EmployeesModule } from './employees/employees.module';
import { ShippersModule } from './shippers/shippers.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule,
    CustomersModule,
    OwnersModule,
    AdminModule,
    EmployeesModule,
    ShippersModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
