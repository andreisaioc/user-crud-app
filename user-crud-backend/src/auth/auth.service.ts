import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {


    constructor(

        private jwtService: JwtService
      ) {}


    async signIn(username: string, pass: string): Promise<any> {

 


        if(username == "test" && pass == "test")       
        {
            const payload = { sub: "1", username: "test" };
            return {
                access_token: await this.jwtService.signAsync(payload),
              };
        }
        else
        {
            throw new UnauthorizedException();
        }
      }

}
