import { DataSource } from 'typeorm';

import { InternalServerErrorException } from '@nestjs/common';

import {
  CreateArticleRequestDto,
  GetArticleQueryDto,
  UpdateArticleDto,
} from '../article/dto';
import { ArticleEntity } from '#entities';
import { ArticleSignEnum } from '#enums';

export class ArticleRepository {
  constructor(private readonly source: DataSource) {}
  async create(params: CreateArticleRequestDto) {
    try {
      const result = await this.source
        .createQueryBuilder(ArticleEntity, 'article')
        .insert()
        .values(params)
        .returning('*')
        .execute();

      return result.raw[0];
    } catch (error) {
      throw new InternalServerErrorException('Failed to create article', error);
    }
  }

  async update(params: UpdateArticleDto) {
    const { id, ...items } = params;

    try {
      const result = await this.source
        .createQueryBuilder(ArticleEntity, 'article')
        .update()
        .set(items)
        .where('id = :id', { id })
        .returning('*')
        .execute();

      return result.raw[0];
    } catch (error) {
      throw new InternalServerErrorException('Failed to update article', error);
    }
  }

  async delete(id: string) {
    try {
      await this.source
        .createQueryBuilder(ArticleEntity, 'article')
        .delete()
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete article', error);
    }
  }

  async listArticle(params: GetArticleQueryDto) {
    const { ids, tags, user } = params;

    try {
      const query = await this.source.createQueryBuilder(
        ArticleEntity,
        'article',
      );

      if (!user) {
        query.andWhere('article.sign = :sign', {
          sign: ArticleSignEnum.public,
        });
      }

      if (ids) {
        if (Array.isArray(ids)) {
          query.andWhere('article.id IN (:...ids)', { ids });
        } else {
          query.andWhere('article.id = :ids', { ids });
        }
      }

      if (tags) {
        if (Array.isArray(tags)) {
          query.andWhere('article.tags IN (:...tags)', { tags });
        } else {
          query.andWhere('article.tags = :tags', { tags });
        }
      }

      return query.getMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get articles', error);
    }
  }
}
