import { IsDefined } from 'class-validator';

import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty()
  @IsDefined()
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  udatedAt: Date;

  @CreateDateColumn()
  deletedAt?: Date;
}
