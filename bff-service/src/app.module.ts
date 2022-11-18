import { CacheModule ,Module } from '@nestjs/common';
import { BffController } from './bff/bff.controller';
import { BffService } from './bff/bff.service';

@Module({
  imports: [CacheModule.register({
    isGlobal: true,
  })],
  controllers: [BffController],
  providers: [BffService],
})
export class AppModule {}
