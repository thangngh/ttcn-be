import { Module } from '@nestjs/common';
import { UserPaymentService } from './user-payment.service';
import { UserPaymentController } from './user-payment.controller';

@Module({
  controllers: [UserPaymentController],
  providers: [UserPaymentService]
})
export class UserPaymentModule {}
