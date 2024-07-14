import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.object';

@Injectable()
export class UsersService {

    private users: User[] = [{
        id: 1,
        name: "andrei",
        email: "andreisaioc@gmail.com",
        phone: "0786944658"},
    
    
        {
            id: 2,
            name: "john",
            email: "john@gmail.com",
            phone: "8482389529345"},

            {
                id: 3,
                name: "Mark",
                email: "mark@microsoft.com",
                phone: "9988288111"}
    
    ];
    private idCounter = 4;
  
    findAll(page: number, limit: number): any {

        const sortedUsers = [...this.users].sort((a, b) => b.id - a.id);
  
        const start = (page - 1) * limit;
        const end = start + limit;
        const totalPages = Math.ceil(sortedUsers.length / limit);
  
        return { totalPages: totalPages, users: sortedUsers.slice(start, end) };
      }


      findAllSearch(searchTerm: string, page: number, limit: number): any {
        const filteredUsers = this.users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sortedUsers = filteredUsers.sort((a, b) => b.id - a.id);
    
        const start = (page - 1) * limit;
        const end = start + limit;
        const totalPages = Math.ceil(sortedUsers.length / limit);
    
        return { totalPages: totalPages, users: sortedUsers.slice(start, end) };
    }
    
    
  
    findOne(id: number): User {
      const user = this.users.find(user => user.id === id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  
    create(user: Omit<User, 'id'>): User {

       
        if(user.email == undefined || user.phone == undefined || user.name == undefined)
        {
            throw new NotFoundException();
        }

        

      const newUser = { ...user, id: this.idCounter++ };
      this.users.push(newUser);
      return newUser;
    }
  
    delete(id: number): void {
      const index = this.users.findIndex(user => user.id === id);
      if (index === -1) {
        throw new NotFoundException('User not found');
      }
      this.users.splice(index, 1);
    }

}
