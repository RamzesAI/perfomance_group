import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UserEntity } from '#entities';
import { AuthGuard } from '#guard';

import { CreateUserRequestDto, UpdateUserRequestDto } from './dto';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiOkResponse({ type: UserEntity })
  @Post('create')
  createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.service.createUser(createUserRequestDto);
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiOkResponse({ type: UserEntity })
  @Put('update/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ) {
    return this.service.updateUser({
      ...updateUserDto,
      id,
    });
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiNoContentResponse()
  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }
}
