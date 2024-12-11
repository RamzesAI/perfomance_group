import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ summary: 'Aутентификация' })
  @Post('login')
  signIn(@Body() userParams: SignInRequestDto) {
    return this.service.singIn(userParams);
  }
}
