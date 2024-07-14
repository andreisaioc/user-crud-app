import { UsersService } from './users.service';
import { User } from './user.object';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(searchTerm: string, page: number, limit: number): User[];
    create(user: Omit<User, 'id'>): User;
    delete(id: number): void;
}
