import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';
import { PotsModule } from './pots/pots.module';
import { PlantsInPotsModule } from './plants_in_pots/plants_in_pots.module';


@Module({
  imports: [PlantsModule, PotsModule, PlantsInPotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
