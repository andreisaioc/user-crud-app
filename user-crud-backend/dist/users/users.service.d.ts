import { User } from './user.object';
export declare class UsersService {
    private users;
    private idCounter;
    findAll(page: number, limit: number): any;
    findAllSearch(searchTerm: string, page: number, limit: number): any;
    findOne(id: number): User;
    create(user: Omit<User, 'id'>): User;
    delete(id: number): void;
}
