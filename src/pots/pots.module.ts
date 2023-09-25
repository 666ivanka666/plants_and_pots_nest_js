import { Module } from '@nestjs/common';
import { PotsController } from './pots.controller';

@Module({
  controllers: [PotsController]
})
export class PotsModule {}
