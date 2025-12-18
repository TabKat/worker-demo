import { Module } from '@nestjs/common';
import { OneModule } from './modules/one/one.module';
import { TwoModule } from './modules/two/two.module';

@Module({
  imports: [OneModule, TwoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
