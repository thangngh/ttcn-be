import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import jwt_decode from 'jwt-decode';
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';
import { Customer } from 'src/customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Shopper } from 'src/shopper/entities/shopper.entity'
import { UpdateShopperDto } from 'src/shopper/dto/update-shopper.dto';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Shopper)
    private readonly shopperRepository: Repository<Shopper>,
  ) { }

  async getProfile(user: User) {
    const userFind = await this.userRepository.findOne({
      where: {
        id: user.id
      },
      relations: ['customer', 'shopper']
    });
    return userFind;
  }

  async updateProfileCustomer(
    user: User,
    updateUserDto: UpdateUserDto,
    updateCustomerDto: UpdateCustomerDto,
    updateShopperDto: UpdateShopperDto,
  ) {
    const userFind = await this.userRepository.findOne({
      where: {
        id: user.id
      },
      relations: ['customer', 'shopper']
    });

    const userUpdate = await this.userRepository.save({
      ...userFind,
      ...updateUserDto,
      updatedAt: new Date()
    });

    if (user.customer !== null) {
      const customerUpdate = await this.customerRepository.save({
        ...user.customer,
        ...updateCustomerDto,
        updatedAt: new Date()
      });
      return {
        ...userUpdate,
        customer: customerUpdate
      }
    } else {
      const shopperUpdate = await this.shopperRepository.save({
        ...user.shopper,
        ...updateShopperDto,
        updatedAt: new Date()
      });
      return {
        ...userUpdate,
        shopper: shopperUpdate
      }
    }
  }

}
