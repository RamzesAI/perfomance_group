import { IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ArticleSignEnum } from '#enums';

export class GetArticleQueryDto {
  @ApiProperty({
    description: 'Список идентификаторов статей',
    required: false,
    type: [String],
  })
  @IsOptional()
  ids: string[];

  @ApiProperty({ description: 'Тег статей', required: false, type: [String] })
  @IsOptional()
  tags: string[];

  articleSign: ArticleSignEnum;

  user?: string | null;
}
