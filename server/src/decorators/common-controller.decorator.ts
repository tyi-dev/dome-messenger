import { applyDecorators, Controller, ControllerOptions, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiType } from '@server/src/constants';
import { ApiTags } from '@nestjs/swagger';

export const CommonController = (prefix: ApiType, path = '') => {
  const p = prefix ? prefix + '/' + path : path;
  const options: ControllerOptions = {
    path: p,
  };

  if (prefix === ApiType.WEBHOOK) {
    options.version = VERSION_NEUTRAL;
  }
  return applyDecorators(Controller(options), ApiTags(p));
};
