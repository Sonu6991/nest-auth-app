import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, take, throwError } from 'rxjs';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('coffessService') private readonly coffessService: ClientProxy,
  ) {}

  @Get()
  async getCofees(@Req() req: Request): Promise<any> {
    try {
      const pattern = { cmd: 'getHello' };
      await this.coffessService.connect();
      // console.log('getCofees...........', this.coffessService);
      const result = await firstValueFrom(
        this.coffessService.send(pattern, ''),
      );

      console.log('result', result);
      this.coffessService.emit('microservice called', { msg: 'hiii' });
      this.coffessService.close();
      return 'fetched successfuly';
    } catch (error) {
      console.log('error.........', error);
      return throwError(() => new InternalServerErrorException());
    }
  }
}
