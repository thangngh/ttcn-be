import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async getRole(userId: string) {
    const builder = await this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.customer", "customer")
      .leftJoinAndSelect("user.employee", "employee")
      .leftJoinAndSelect("user.admin", "admin")
      .leftJoinAndSelect("user.shipper", "shipper")
      .where("user.id = :id", { id: userId })
      .getOne();

    return builder;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
