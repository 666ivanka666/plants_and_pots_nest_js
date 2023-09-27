import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { IdDto, PlantsDto } from './dto';
import { Plants } from './type';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  addPlants(@Body() body: PlantsDto): { id: string } {
    const generatedId = this.plantsService.insertPlants(body.name);
    return { id: generatedId };
  }

  @Get()
  async getAllPlants(): Promise<PlantsDto[]> {
    return this.plantsService.getPlants();
  }

  @Get(':id')
  async getPlantsById(@Param() params: IdDto): Promise<PlantsDto> {
    return this.plantsService.getSinglePlants(params.id);
  }

  @Put(':id')
  updatePlants(@Param() params: IdDto, @Body() body: PlantsDto): Plants {
    return this.plantsService.updatePlants(params.id, body.name);
  }

  @Delete(':id')
  deletePlantsById(@Param() params: IdDto): { message: string } {
    this.plantsService.deletePlants(params.id);
    return { message: 'Uspjesno obrisano' };
  }
}
