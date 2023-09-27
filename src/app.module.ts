import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';
import { PotsModule } from './pots/pots.module';

@Module({
  imports: [PlantsModule, PotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
