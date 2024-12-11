import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ArticleGuard, AuthGuard } from '#guard';
import { ArticleEntity } from '#entities';

import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ArticleService } from './article.service';

import {
  CreateArticleRequestDto,
  GetArticleQueryDto,
  UpdateArticleDto,
} from './dto';
import { UserParam } from './decorators';

@ApiTags('Articles')
@ApiBearerAuth()
@Controller('article')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @ApiOperation({ summary: 'Создание статьи' })
  @ApiOkResponse({ type: ArticleEntity })
  @UseGuards(AuthGuard)
  @Post('create')
  createArticle(@Body() createArticleRequestDto: CreateArticleRequestDto) {
    return this.service.createArticle(createArticleRequestDto);
  }

  @ApiOperation({ summary: 'Обновление атрибутов статьи' })
  @ApiOkResponse({ type: ArticleEntity })
  @UseGuards(AuthGuard)
  @Put('update/:id')
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.service.updateArticle({
      ...updateArticleDto,
      id,
    });
  }

  @ApiOperation({ summary: 'Удаление статьи' })
  @ApiNoContentResponse()
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteArticle(@Param('id') id: string) {
    return this.service.deleteArticle(id);
  }

  @ApiOperation({ summary: 'Получение статей' })
  @UseGuards(ArticleGuard)
  @Get('get')
  getArticles(@UserParam() user: string, @Query() params: GetArticleQueryDto) {
    params.user = user;

    return this.service.listArticle(params);
  }
}
