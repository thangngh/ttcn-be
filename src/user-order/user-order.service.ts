import { Injectable } from '@nestjs/common';
import { CreateUserOrderDto } from './dto/create-user-order.dto';
import { UpdateUserOrderDto } from './dto/update-user-order.dto';

@Injectable()
export class UserOrderService {
  create(createUserOrderDto: CreateUserOrderDto) {
    return 'This action adds a new userOrder';
  }

  findAll() {
    return `This action returns all userOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userOrder`;
  }

  update(id: number, updateUserOrderDto: UpdateUserOrderDto) {
    return `This action updates a #${id} userOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} userOrder`;
  }
}
