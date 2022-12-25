import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { enumRole } from 'src/common/common.interface';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopEntity } from './entities/shop.entity';

@Injectable()
export class ShopService {

  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async create(createShopDto: CreateShopDto, user: UserEntity) {

    const { name, address, phone, email, description, isActive = false, userid = user.id } = createShopDto;

    await this.shopRepository.createQueryBuilder('shop')
      .insert()
      .into(ShopEntity)
      .values({
        name,
        address,
        phone,
        email,
        description,
        isActive,
        userid
      })
      .execute();

    return {
      status: HttpStatus.CREATED,
      content: "Create shop successfully",
    }
  }

  async getShopByUser(user: UserEntity) {
    const { id } = user;
    const shop = await this.shopRepository.findOne({
      where: { userid: id },
      relations: ['user']
    });
    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }
    return {
      status: HttpStatus.OK,
      content: shop,
    }
  }

  // async upDateShop() { }

  // async findAllUserOrder() { }

  // async calculateRevenue() { }

}
