import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    signIn(username: string, pass: string): Promise<any>;
}
