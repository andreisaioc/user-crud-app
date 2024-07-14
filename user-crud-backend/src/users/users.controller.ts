import { Controller } from '@nestjs/common';
import { Query, Get, Post,Param, Delete, Body, UseGuards, ParseIntPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.object';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

 
    @Get('')
    findAll(@Query('searchTerm') searchTerm: string, @Query('page') page: number, @Query('limit') limit: number): User[] {
        
        if(searchTerm != null)
        return this.usersService.findAllSearch(searchTerm, page || 1, limit || 5);
        else
        return this.usersService.findAll(page || 1, limit || 5);
      }
  
    @Post()
    create(@Body() user: Omit<User, 'id'>): User {
      return this.usersService.create(user);
    }
  
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): void {
      this.usersService.delete(id);
    }
}
