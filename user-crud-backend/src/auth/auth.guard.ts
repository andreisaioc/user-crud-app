import {  CanActivate, ExecutionContext,   Injectable,     UnauthorizedException  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/jwt.constants';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException("I am sorry but token is bad");
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );

        request['user'] = payload;
      } 
      catch {
        throw new UnauthorizedException("the payload is bad");
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      const myTok = type === 'Bearer' ? token : undefined;
 

      return myTok
    }
  }