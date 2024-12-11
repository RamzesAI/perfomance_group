import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EncryptionService } from '#services';

import { SignInRequestDto } from './dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private service: UserService,
    private jwtService: JwtService,
  ) {}

  async singIn(userParams: SignInRequestDto) {
    const user = await this.service.findUserByEmail(userParams.email);
    const compareResult = await new EncryptionService().verifyPassword(
      user.password,
      userParams.password,
    );

    if (!compareResult) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
