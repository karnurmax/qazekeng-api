import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // JWT қателерін дұрыс өңдеу
    if (err || !user) {
      if (info && info.message) {
        throw new UnauthorizedException(`JWT Error: ${info.message}`);
      }
      throw err || new UnauthorizedException('Invalid or missing JWT token');
    }
    return user;
  }
}

