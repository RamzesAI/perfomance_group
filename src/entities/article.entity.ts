import { IsDefined, IsEnum, IsString } from 'class-validator';

import { Column, Entity } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { ArticleSignEnum } from '#enums';

import { BaseEntity } from './base.entity';

@Entity('article')
export class ArticleEntity extends BaseEntity {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Column({ type: 'varchar', nullable: false })
  content: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Column({ type: 'varchar', nullable: false })
  tags: string;

  @ApiProperty()
  @IsDefined()
  @IsEnum(ArticleSignEnum)
  @Column({ type: 'varchar', nullable: false })
  sign: ArticleSignEnum;
}
