import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ArticleModule } from '#article';
import { AuthModule } from '#auth';
import { UserModule } from '#user';
import dataSource from '#typeorm/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
    ArticleModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
