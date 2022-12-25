import { Controller, Get, Post, Body, Patch, Param, UploadedFile, Delete, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { AuthUser } from './user.decorator';
import { UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/common/helper/helper';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get("/all-user")
  findAllUser() {
    return this.usersService.findAllUser();
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@AuthUser() user) {
    return this.usersService.getProfile(user);
  }

  @UseGuards(JWTAuthGuard)
  @Post('become-shopper')
  becomeShopper(@AuthUser() user) {
    return this.usersService.becomeShopper(user);
  }

  @UseGuards(JWTAuthGuard)
  @Patch("edit-profile")
  editProfile(@AuthUser() user, @Body() payload: UpdateUserDto) {
    return this.usersService.editProfile(user, payload);
  }

  @UseGuards(JWTAuthGuard)
  @Get("/get-role")
  getRole(@AuthUser() user) {
    return this.usersService.getRole(user);
  }

  // @UseGuards(JWTAuthGuard)
  @Post("/upload-image/:userId/image")
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/avatars',

        filename: editFileName,
      }),
      limits: {
        fileSize: 1024 * 1024 * 2,
      },
      fileFilter: imageFileFilter,
    }),
  )
  uploadImage(@Param('userId') userId: string, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.uploadImage(userId, file);
  }

  @Get('get-image/:imgpath')
  async seenImage(@Param('imgpath') imgpath, @Res() res) {
    res.sendFile(imgpath, { root: './upload/avatars' });
  }
}
