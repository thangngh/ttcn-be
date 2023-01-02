import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    const { type, name } = createPaymentDto;

    if (!type) throw new HttpException('Some thing wrong', HttpStatus.BAD_REQUEST);
    if (!name) throw new HttpException('Some thing wrong', HttpStatus.BAD_REQUEST);

    return await this.paymentRepository.save(createPaymentDto);
  }


}
