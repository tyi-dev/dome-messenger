import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): unknown => {
   const request = ctx.switchToHttp().getRequest();
   const { iat, exp, ...rest } = request.user;
   return rest;
});
