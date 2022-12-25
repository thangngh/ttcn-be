import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { enumRole } from 'src/common/common.interface';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findAllUser() {
    const users = await this.userRepository.find();

    return users;
  }

  async getProfile(user: UserEntity) {
    const userRep = await this.userRepository.findOne({
      where: {
        id: user.id
      },
      relations: ['role']
    });

    const result = {
      id: userRep.id,
      firstname: userRep.firstname,
      lastname: userRep.lastname,
      gender: userRep.gender,
      address: userRep.address,
      phone: userRep.phone,
      avatar: userRep.avatar,
      email: userRep.email,
      username: userRep.username,
      password: userRep.password,
      role: userRep.role.name
    }

    return result;
  }

  async becomeShopper(user: UserEntity) {
    const userRep = await this.userRepository.findOne({
      where: {
        id: user.id
      }
    });

    userRep.roleid = enumRole.SHOPPER;

    const result = await this.userRepository.save(userRep);

    return {
      status: HttpStatus.OK,
      message: 'Become shopper successfully',
      data: result
    };
  }

  async getRole(user: UserEntity) {
    const userRep = await this.userRepository.findOne({
      where: {
        id: user.id
      },
      relations: ['role']
    });

    return userRep;
  }

  async editProfile(user: UserEntity, updateUserDto: UpdateUserDto) {

    const userRep = await this.getProfile(user);

    if (userRep) {
      const {
        firstname,
        lastname,
        gender,
        address,
        phone,
        email,
        username,
        avatar
      } = updateUserDto;
      const builder = await this.userRepository.createQueryBuilder()
        .update(UserEntity)
        .set({
          firstname,
          lastname,
          gender,
          address,
          phone,
          email,
          username,
          avatar
        })
        .where('id = :id', { id: userRep.id })
        .execute();

      return {
        status: HttpStatus.ACCEPTED,
        message: 'Update profile successfully',
      }
    }

    return {
      status: HttpStatus.NOT_FOUND,
      message: 'Something went wrong',
    }

  }

  async uploadImage(userId: string, avatar: Express.Multer.File) {

    const avatarName = avatar.filename;
    try {
      const builder = await this.userRepository.createQueryBuilder()
        .update(UserEntity)
        .set({
          avatar: avatarName
        })
        .where('id = :id', { id: userId })
        .execute();
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Upload image successfully',
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async resetPassword() { }

  /*waiting ...!*/
  async changePassword(user: UserEntity, updateUserDto: UpdateUserDto) {
    const userRep = await this.userRepository.findOne({
      where: {
        id: user.id
      }
    })

    if (userRep) {
      const {
        password
      } = updateUserDto;

      const isMatch = await userRep.validatePassword(password as string);

      if (!isMatch) {
        throw new HttpException('Wrong password', 401);
      }

      const builder = await this.userRepository.createQueryBuilder()
        .update(UserEntity)
        .set({
          password,
          updatedat: new Date()
        })
        .where('id = :id', { id: userRep.id })
        .execute();

      return {
        status: HttpStatus.ACCEPTED,
        message: 'Change password successfully',
      }
    }

    return {
      status: HttpStatus.NOT_FOUND,
      message: 'Something went wrong',
    }
  }

}
