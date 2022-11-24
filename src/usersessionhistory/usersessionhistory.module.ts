import { Module } from '@nestjs/common';
import { UsersessionhistoryService } from './usersessionhistory.service';
import { UsersessionhistoryController } from './usersessionhistory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usersessionhistory } from './entities/usersessionhistory.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usersessionhistory, User])
  ],
  controllers: [UsersessionhistoryController],
  providers: [UsersessionhistoryService]
})
export class UsersessionhistoryModule { }
