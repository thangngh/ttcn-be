import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPaymentService } from './user-payment.service';
import { CreateUserPaymentDto } from './dto/create-user-payment.dto';
import { UpdateUserPaymentDto } from './dto/update-user-payment.dto';

@Controller('user-payment')
export class UserPaymentController {
  constructor(private readonly userPaymentService: UserPaymentService) {}

  @Post()
  create(@Body() createUserPaymentDto: CreateUserPaymentDto) {
    return this.userPaymentService.create(createUserPaymentDto);
  }

  @Get()
  findAll() {
    return this.userPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPaymentDto: UpdateUserPaymentDto) {
    return this.userPaymentService.update(+id, updateUserPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPaymentService.remove(+id);
  }
}
