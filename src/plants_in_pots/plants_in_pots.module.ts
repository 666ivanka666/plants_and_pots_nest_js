import { Module } from '@nestjs/common';
import { PlantsInPotsController } from './plants_in_pots.controller';
import { PlantsInPotsService } from './plants_in_pots.service';

@Module({
  controllers: [PlantsInPotsController],
  providers: [PlantsInPotsService],
})
export class PlantsInPotsModule {}

export class PlantInPot {
  constructor(
    public id: string,
    public name: string,
  ) {}
}
