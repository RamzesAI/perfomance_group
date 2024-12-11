import { PartialType } from '@nestjs/swagger';
import { CreateArticleRequestDto } from './create-article-request.dto';

export class UpdateArticleDto extends PartialType(CreateArticleRequestDto) {
  id: string;
}
