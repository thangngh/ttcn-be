import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductShopService } from 'src/product-shop/product-shop.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly productShopService: ProductShopService
  ) { }

  async createProduct(create: CreateProductDto, shopid: string, image: Express.Multer.File) {
    const {
      name,
      description,
      price,
      quantity,
      categoryid
    } = create;

    const product = new ProductEntity({
      name,
      description,
      price,
      quantity,
      image: image.filename,
      categoryid
    });
    await this.productRepository.createQueryBuilder()
      .insert()
      .into(ProductEntity)
      .values(product)
      .execute();

    const id = product.id;

    await this.productShopService.addProductIntoShop(id, shopid);

    return {
      status: HttpStatus.OK,
      message: "Product created successfully"
    }
  }

  async updateProduct(id: string, update: UpdateProductDto, shopid: string) {

    const findProductInShop = await this.productShopService.findProductWithShop(shopid);

    if (!findProductInShop.data.find(product => product.productid === id)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Product not found"
      }
    }

    const {
      name,
      description,
      price,
      image,
      quantity,
      updatedat = new Date()
    } = update;

    await this.productRepository.update(id, { name, description, price, image, quantity, updatedat });

    return {
      status: HttpStatus.OK,
      message: "Product updated successfully"
    }
  }

  async deleteProduct(id: string, shopid: string) {

    const findProductInShop = await this.productShopService.findProductWithShop(shopid);

    if (!findProductInShop.data.find(product => product.productid === id)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Product not found"
      }
    }

    await this.productRepository.delete(id);

    return {
      status: HttpStatus.OK,
      message: "Product deleted successfully"
    }
  }

  async getProduct(id: string, shopid: string) {

    const findProductInShop = await this.productShopService.findProductWithShop(shopid);

    if (!findProductInShop.data.find(product => product.productid === id)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Product not found"
      }
    }

    const product = await this.productRepository.findOne(id);

    return {
      status: HttpStatus.OK,
      data: product
    }
  }

  async findProduct(keyword: string) {
    const products = await this.productRepository.createQueryBuilder()
      .where("name like :keyword", { keyword: `%${keyword}%` })
      .getMany();

    return {
      status: HttpStatus.OK,
      data: products
    }
  }

}
