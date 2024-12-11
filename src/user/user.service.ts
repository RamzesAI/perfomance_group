import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repository/user.repository';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dto';

@Injectable()
export class UserService {
  private readonly repo: UserRepository;
  constructor(private readonly source: DataSource) {
    this.repo = new UserRepository(source);
  }

  async createUser(params: CreateUserRequestDto) {
    return this.repo.create(params);
  }

  async updateUser(params: UpdateUserRequestDto) {
    return this.repo.update(params);
  }

  async deleteUser(id: string) {
    return this.repo.delete(id);
  }

  async findUserByEmail(email: string) {
    return this.repo.findUserByEmail(email);
  }
}
