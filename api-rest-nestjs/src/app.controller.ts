import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }
}
