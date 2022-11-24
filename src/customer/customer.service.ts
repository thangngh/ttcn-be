import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/common/common.interface';
import { Shopper } from 'src/shopper/entities/shopper.entity';
import { Repository } from 'typeorm';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Shopper)
    private shopperRepository: Repository<Shopper>,
  ) { }

  async update(userId: string, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepository.createQueryBuilder("customer")
      .update(Customer)
      .set(updateCustomerDto)
      .where("userId = :userId", { userId })
      .execute();

    return {
      status: HttpStatus.OK,
      message: 'Updated successfully',
    }
  }

  async registerShop(userId: string, UpdateCustomerDto: UpdateCustomerDto) {
    const { role } = UpdateCustomerDto;
    await this.shopperRepository.createQueryBuilder("shopper")
      .insert()
      .into(Shopper)
      .values({ userId, role: UserRole.SHOPPER })
      .execute();

    return {
      status: HttpStatus.OK,
      message: 'Signed shop successfully',
    }
  }

}
