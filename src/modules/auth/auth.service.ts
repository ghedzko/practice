import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      const payload = { email: user.email };
      const access_token = await this.jwtService.sign(payload);
      return { access_token };
    } else {
      throw new UnauthorizedException();
    }
  }
}
