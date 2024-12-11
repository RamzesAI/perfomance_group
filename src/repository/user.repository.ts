import { DataSource } from 'typeorm';

import { InternalServerErrorException } from '@nestjs/common';

import { UserEntity } from '#entities';

import { CreateUserRequestDto, UpdateUserRequestDto } from '../user/dto';

export class UserRepository {
  constructor(private readonly source: DataSource) {}
  async create(params: CreateUserRequestDto) {
    console.log(params);

    try {
      const result = await this.source
        .createQueryBuilder(UserEntity, 'user')
        .insert()
        .values(params)
        .returning('*')
        .execute();

      return result.raw[0];
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user', error);
    }
  }

  async update(params: UpdateUserRequestDto) {
    const { id, ...items } = params;

    try {
      const result = await this.source
        .createQueryBuilder(UserEntity, 'article')
        .update()
        .set(items)
        .where('id = :id', { id })
        .returning('*')
        .execute();

      return result.raw[0];
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user', error);
    }
  }

  async delete(id: string) {
    try {
      await this.source
        .createQueryBuilder(UserEntity, 'article')
        .delete()
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user', error);
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.source
        .createQueryBuilder(UserEntity, 'user')
        .where('user.email = :email', { email })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get articles', error);
    }
  }
}
