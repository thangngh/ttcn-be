import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductShopDto } from './dto/create-product-shop.dto';
import { UpdateProductShopDto } from './dto/update-product-shop.dto';
import { ProductShopEntity } from './entities/product-shop.entity';

@Injectable()
export class ProductShopService {
  constructor(
    @InjectRepository(ProductShopEntity)
    private readonly productShopRepository: Repository<ProductShopEntity>,
    private readonly categoryService: CategoryService,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) { }

  async findAllProductShop() {
    const productshops = await this.productShopRepository.find({
      relations: ["products", "shop"]
    });

    const productshop = productshops.map((productshop) => ({
      productId: productshop.products.id,
      productPrice: productshop.products.price,
      productName: productshop.products.name,
      productDescription: productshop.products.description,
      productImage: productshop.products.image,
      shopId: productshop.shop.id,
      shopName: productshop.shop.name,
    }))

    return {
      status: HttpStatus.OK,
      data: productshop
    }
  }

  async findProductWithShop(shopid: string) {
    const productshops = await this.productShopRepository.find({
      where: {
        shopid
      },
      relations: ["products", "shop"]
    });

    const productshop: any[] = productshops.map((productshop) => ({
      productid: productshop.products.id,
      productPrice: productshop.products.price,
      productName: productshop.products.name,
      productDescription: productshop.products.description,
      productImage: productshop.products.image,
      shopId: productshop.shop.id,
      shopName: productshop.shop.name,
      categoryid: productshop.products.categoryid,
      createdat: productshop.products.createdat,
      updatedat: productshop.products.updatedat,
      quantity: productshop.products.quantity
    }))

    const categoryId = productshop.map((productshop) => productshop.categoryid);

    const category = []

    for await (const id of categoryId) {
      const categoryRes = await this.categoryService.findCategoryById(id);

      category.push(categoryRes)
    }
    const result = productshop.map((productshop, index) => {
      const findCategoryId = category.find((category) => category.category.id === productshop.categoryid);
      if (findCategoryId) {
        productshop.categoryname =
          [
            ...new Set(
              category.filter((category) => category.category.id === productshop.categoryid).map((category) => category.category.name)
            )
          ].join("")
        // productshop.categoryname = category.reduce((acc, cur) => {
        //   if (cur.category.id === productshop.categoryid) {
        //     acc.push(cur.category.name)
        //   }
        //   return acc.join("")
        // }, [])

      }
      return productshop
    })

    return {
      status: HttpStatus.OK,
      data: result
    }
  }

  async addProductIntoShop(productid: string, shopid: string) {

    await this.productShopRepository.createQueryBuilder()
      .insert()
      .into(ProductShopEntity)
      .values({
        productid,
        shopid
      })
      .execute();

  }

  async updateProductShop(productid: string, updateProductShopDto: UpdateProductDto) {
    const productshop = await this.productShopRepository.findOne
      ({
        where: {
          productid: productid
        },
        relations: ["products", "shop"]
      });

    if (!productshop) {
      throw new HttpException("ProductShop not found", HttpStatus.NOT_FOUND);
    }

    await this.productRepository.update(productid, updateProductShopDto);

    return {
      status: HttpStatus.OK,
      message: "Update ProductShop successfully"
    }

  }
}