import { applyDecorators } from '@nestjs/common';
import { CommonController } from '@server/src/decorators/common-controller.decorator';
import { ApiType } from '@server/src/constants';

export const WebsiteController = (path = '') => {
  return applyDecorators(CommonController(ApiType.WEBSITE, path));
};
