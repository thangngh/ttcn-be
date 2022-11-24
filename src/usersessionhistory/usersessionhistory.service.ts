import { Injectable } from '@nestjs/common';
import { CreateUsersessionhistoryDto } from './dto/create-usersessionhistory.dto';
import { UpdateUsersessionhistoryDto } from './dto/update-usersessionhistory.dto';

@Injectable()
export class UsersessionhistoryService {
  create(createUsersessionhistoryDto: CreateUsersessionhistoryDto) {
    return 'This action adds a new usersessionhistory';
  }

  findAll() {
    return `This action returns all usersessionhistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersessionhistory`;
  }

  update(id: number, updateUsersessionhistoryDto: UpdateUsersessionhistoryDto) {
    return `This action updates a #${id} usersessionhistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersessionhistory`;
  }
}
