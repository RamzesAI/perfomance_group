import { DataSource } from 'typeorm';

import { Logger } from '@nestjs/common';

import { UserEntity } from '#entities';
import { EncryptionService } from '#services';
import { UserRepository } from '#repository';

export async function seed(source: DataSource) {
  const logger = new Logger('Bootstrap');
  await createUsers(source, logger);
}

async function createUsers(source: DataSource, logger: Logger) {
  const userRepo = new UserRepository(source);

  try {
    const user = new UserEntity();
    user.email = 'user1@user.ru';
    user.password = await new EncryptionService().createHash('qwerty123');
    await userRepo.create(user);

    user.email = 'user2@user.ru';
    user.password = await new EncryptionService().createHash('qwerty123');

    await userRepo.create(user);
  } catch (error) {
    logger.error(error);
  }
}
