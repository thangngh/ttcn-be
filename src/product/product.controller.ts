import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/common/helper/helper';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post("/create-product/:shopId")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./upload/products",

        filename: editFileName
      }),
      limits: {
        fileSize: 1024 * 1024 * 2
      },
      fileFilter: imageFileFilter
    })
  )
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File, @Param("shopId") shopId: string) {
    console.log(file)
    return this.productService.createProduct(createProductDto, shopId, file);
  }

  @Get('get-image/:imgpath')
  async getImageProduct(@Param('imgpath') imgpath, @Res() res) {
    res.sendFile(imgpath, { root: './upload/products' });
  }

}
