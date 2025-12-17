import { Module } from '@nestjs/common';
import { OneModule } from './one/one.module';
import { TwoModule } from './two/two.module';

@Module({
  imports: [OneModule, TwoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
