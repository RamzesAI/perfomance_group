import { PickType } from '@nestjs/swagger';

import { ArticleEntity } from '#entities';

export class CreateArticleRequestDto extends PickType(ArticleEntity, [
  'title',
  'content',
  'tags',
  'sign',
]) {}
