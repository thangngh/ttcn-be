import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAddUser, UserRole } from 'src/common/common.interface';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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
      .execute();
  }

  findAll() {
    const builder = this.customerRepository.createQueryBuilder("customer")
      .select()
      .leftJoinAndSelect("customer.user", "user")
      .getMany();
    return builder;
  }


  async getProfileUser(id: string) {
    const builder = await this.userRepository.createQueryBuilder("user")
      .select()
      .where("user.id = :id", { id })

    return builder;
  }

  update(id: string, updateCustomerDto: UpdateUserDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
