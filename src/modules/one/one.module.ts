import { Module } from '@nestjs/common';
import { OneController } from './one.controller';
import { OneService } from './one.service';

@Module({
  controllers: [OneController],
  providers: [OneService]
})
export class OneModule {}
