import { Controller, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }


  @Patch('/profile/:id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateUserDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete('profile/:id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }

  @Get("/get-all-customers")
  findAll() {
    return this.customersService.findAll();
  }
}
