import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAddUser, UserRole } from 'src/common/common.interface';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) { }
  async create(createCustomerDto: CreateCustomerDto) {
    const { role, userId } = createCustomerDto;
    await this.customerRepository.createQueryBuilder("customer")
      .insert()
      .into(Customer)
      .values([
        {
          role: UserRole.USER,
          userId
        }
      ])
      // .select(['id'])
      // .from(User, 'user')
      .execute();
  }

  findAll() {
    const builder = this.customerRepository.createQueryBuilder("customer")
      .select(['customer.role'])
      .leftJoinAndSelect("customer.user", "user")
      .getMany();
    return builder;
  }


  async findOne(id: string) {
    const builder = await this.customerRepository.createQueryBuilder("customer")
      .select(['customer.role'])
      .leftJoinAndSelect("customer.user", "user")
      .where("customer.user_id = :id", { id })
      .getOne();

    return builder;
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
