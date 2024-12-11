import { IsString } from 'class-validator';

import { ApiProperty, PickType } from '@nestjs/swagger';

import { UserEntity } from '#entities';

export class SignInRequestDto extends PickType(UserEntity, [
  'email',
  'password',
]) {
  @ApiProperty()
  @IsString()
  password: string;
}
