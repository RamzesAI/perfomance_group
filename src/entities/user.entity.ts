import { IsDefined, IsEmail, IsOptional, MinLength } from 'class-validator';

import { Column, Entity } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from './base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty({ description: 'Электронная почта' })
  @IsDefined()
  @IsEmail()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @IsOptional()
  @MinLength(8, { message: 'Пароль не может быть короче 8 символов' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  password!: string;
}
