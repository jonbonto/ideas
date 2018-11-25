import { Injectable, Get } from '@nestjs/common';

@Injectable()
export class AppService {
  
  @Get()
  root() {
    return { ping: 'pong' };
  }
}
