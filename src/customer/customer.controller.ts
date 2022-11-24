import { Controller, Body, Patch, Param, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Patch('/update-customer/:userId')
  update(@Param('userId') userId: string, @Body(new ValidationPipe()) updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(userId, updateCustomerDto);
  }

}
