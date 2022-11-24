import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersessionhistoryService } from './usersessionhistory.service';
import { CreateUsersessionhistoryDto } from './dto/create-usersessionhistory.dto';
import { UpdateUsersessionhistoryDto } from './dto/update-usersessionhistory.dto';

@Controller('usersessionhistory')
export class UsersessionhistoryController {
  constructor(private readonly usersessionhistoryService: UsersessionhistoryService) {}

  @Post()
  create(@Body() createUsersessionhistoryDto: CreateUsersessionhistoryDto) {
    return this.usersessionhistoryService.create(createUsersessionhistoryDto);
  }

  @Get()
  findAll() {
    return this.usersessionhistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersessionhistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersessionhistoryDto: UpdateUsersessionhistoryDto) {
    return this.usersessionhistoryService.update(+id, updateUsersessionhistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersessionhistoryService.remove(+id);
  }
}
