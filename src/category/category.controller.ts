import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @UseGuards(JWTAuthGuard)
  @Post("create-category")
  createCategory(@Body() create: CreateCategoryDto) {
    return this.categoryService.createCategory(create);
  }

  @UseGuards(JWTAuthGuard)
  @Get("/find-product-categories")
  findAll(@Query("name") name: string) {
    return this.categoryService.findProductByCategory(name);
  }

  @UseGuards(JWTAuthGuard)
  @Get("/category-shop/:shopid")
  getCategoryByShop(@Param("shopid") shopid: string) {
    return this.categoryService.getCategoryByShopId(shopid);
  }

  @UseGuards(JWTAuthGuard)
  @Patch("/update-category/:id")
  updateCategory(@Param("id") id: string, @Body() update: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, update);
  }

  // @UseGuards(JWTAuthGuard)
  @Get("/get-all-categories")
  getAllCategories() {
    return this.categoryService.getAllCategory();
  }
}
