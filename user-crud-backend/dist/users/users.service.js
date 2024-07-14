"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [{
                id: 1,
                name: "andrei",
                email: "andreisaioc@gmail.com",
                phone: "0786944658"
            },
            {
                id: 2,
                name: "john",
                email: "john@gmail.com",
                phone: "8482389529345"
            },
            {
                id: 3,
                name: "Mark",
                email: "mark@microsoft.com",
                phone: "9988288111"
            }
        ];
        this.idCounter = 4;
    }
    findAll(page, limit) {
        const sortedUsers = [...this.users].sort((a, b) => b.id - a.id);
        const start = (page - 1) * limit;
        const end = start + limit;
        const totalPages = Math.ceil(sortedUsers.length / limit);
        return { totalPages: totalPages, users: sortedUsers.slice(start, end) };
    }
    findAllSearch(searchTerm, page, limit) {
        const filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const sortedUsers = filteredUsers.sort((a, b) => b.id - a.id);
        const start = (page - 1) * limit;
        const end = start + limit;
        const totalPages = Math.ceil(sortedUsers.length / limit);
        return { totalPages: totalPages, users: sortedUsers.slice(start, end) };
    }
    findOne(id) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    create(user) {
        if (user.email == undefined || user.phone == undefined || user.name == undefined) {
            throw new common_1.NotFoundException();
        }
        const newUser = { ...user, id: this.idCounter++ };
        this.users.push(newUser);
        return newUser;
    }
    delete(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException('User not found');
        }
        this.users.splice(index, 1);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map