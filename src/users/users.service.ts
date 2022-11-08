import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import jwt_decode from 'jwt-decode';
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
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

  async getProfile(accessToken: GetUserDto) {
    const decoded: JwtPayload = await jwt_decode(accessToken.accessToken as string);
    const { id, userName } = decoded;

    const user = await this.userRepository.createQueryBuilder("user")
      .where("user.user_name = :userName", { userName })
      .andWhereInIds(id)
      .getOne();

    return user;
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
