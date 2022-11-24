import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { AuthUser } from './user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get("profile")
  @UseGuards(JWTAuthGuard)
  async getProfile(@AuthUser() user: User) {
    return await this.usersService.getProfile(user);
  }

}
