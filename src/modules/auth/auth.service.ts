import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { sign } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
  }
}
