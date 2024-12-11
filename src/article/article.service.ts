import { Injectable } from '@nestjs/common';

import {
  CreateArticleRequestDto,
  GetArticleQueryDto,
  UpdateArticleDto,
} from './dto';
import { DataSource } from 'typeorm';

import { ArticleRepository } from '#repository';

@Injectable()
export class ArticleService {
  private readonly repo: ArticleRepository;
  constructor(private readonly source: DataSource) {
    this.repo = new ArticleRepository(source);
  }

  async createArticle(params: CreateArticleRequestDto) {
    return this.repo.create(params);
  }

  async updateArticle(params: UpdateArticleDto) {
    return this.repo.update(params);
  }

  async deleteArticle(id: string) {
    return this.repo.delete(id);
  }

  async listArticle(params: GetArticleQueryDto) {
    return this.repo.listArticle(params);
  }
}
