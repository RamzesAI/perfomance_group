import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { UserRepository } from '#repository';

@Injectable()
export class UserService {
  private readonly repo: UserRepository;
  constructor(private readonly source: DataSource) {
    this.repo = new UserRepository(source);
  }
  async findUserByEmail(email: string) {
    return this.repo.findUserByEmail(email);
  }
}
