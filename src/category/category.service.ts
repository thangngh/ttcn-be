import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) { }

  async createCategory(create: CreateCategoryDto) {
    const {
      name,
      shopid
    } = create;
    const category = new CategoryEntity({ name, shopid });
    await this.categoryRepository.createQueryBuilder()
      .insert()
      .into(CategoryEntity)
      .values(category)
      .execute();

    return {
      status: HttpStatus.CREATED,
      message: "Category created successfully"
    }
  }

  async updateCategory(id: string, update: UpdateCategoryDto) {
    const {
      name,
      updateat
    } = update;
    const category = new CategoryEntity({ name, updatedat: updateat });
    await this.categoryRepository.createQueryBuilder()
      .update(CategoryEntity)
      .set(category)
      .where("id = :id", { id })
      .execute();

    const data = await this.categoryRepository.findOne({
      where: { id }
    });

    return {
      status: HttpStatus.CREATED,
      message: "Category updated successfully",
      data: data
    }
  }

  async deleteCategory(id: string) {
    await this.categoryRepository.createQueryBuilder()
      .delete()
      .from(CategoryEntity)
      .where("id = :id", { id })
      .execute();

    return {
      status: HttpStatus.OK,
      message: "Category deleted successfully"
    }
  }

  async getAllCategory() {
    return await this.categoryRepository.find();
  }

  async findProductByCategory(name: string) {
    const category = await this.categoryRepository.findOne({
      where: { name }
    });

    if (!category) throw new HttpException("Category not found", HttpStatus.NOT_FOUND);

    const categoryId = category?.id;

    const product = await this.productRepository.find({ where: { categoryid: categoryId } });
    return {
      status: HttpStatus.OK,
      data: product
    }
  }

  async getCategoryByShopId(shopid: string) {
    const categories = await this.categoryRepository.find({
      where: { shopid }
    });
    return {
      status: HttpStatus.OK,
      categories
    }
  }

  async findCategoryById(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id }
    });
    return {
      status: HttpStatus.OK,
      category
    }
  }
}
