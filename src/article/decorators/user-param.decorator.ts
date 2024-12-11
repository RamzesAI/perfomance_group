import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserParam = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request?.user;

    return user ? user.username : user;
  },
);
