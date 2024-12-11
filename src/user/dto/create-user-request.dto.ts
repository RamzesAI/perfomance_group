import { IsString } from 'class-validator';

import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

import { UserEntity } from '#entities';

export class CreateUserRequestDto extends PickType(PartialType(UserEntity), [
  'email',
  'password',
]) {
  @ApiProperty()
  @IsString()
  password: string;
}
