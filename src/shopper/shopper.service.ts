import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShopperDto } from './dto/create-shopper.dto';
import { UpdateShopperDto } from './dto/update-shopper.dto';
import { Shopper } from './entities/shopper.entity';

@Injectable()
export class ShopperService {

  constructor(
    @InjectRepository(Shopper)
    private shopperRepository: Repository<Shopper>,
  ) { }

  async update(userId: string, updateShopperDto: UpdateShopperDto) {
    await this.shopperRepository.createQueryBuilder("shopper")
      .update(Shopper)
      .set(updateShopperDto)
      .where("userId = :userId", { userId })
      .execute();

    return {
      status: HttpStatus.OK,
      message: 'Updated successfully',
    }
  }

}
