import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserOrderService } from './user-order.service';
import { CreateUserOrderDto } from './dto/create-user-order.dto';
import { UpdateUserOrderDto } from './dto/update-user-order.dto';

@Controller('user-order')
export class UserOrderController {
  constructor(private readonly userOrderService: UserOrderService) {}

  @Post()
  create(@Body() createUserOrderDto: CreateUserOrderDto) {
    return this.userOrderService.create(createUserOrderDto);
  }

  @Get()
  findAll() {
    return this.userOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserOrderDto: UpdateUserOrderDto) {
    return this.userOrderService.update(+id, updateUserOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userOrderService.remove(+id);
  }
}
