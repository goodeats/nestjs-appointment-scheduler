import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Doctor } from './doctor.entity';

// data not being used, underscore to indicate that
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Doctor => {
    const req = ctx.switchToHttp().getRequest();
    return req.doctor;
  },
);
