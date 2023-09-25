import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { IdDto, PlantsDto } from './dto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  async addPlants(@Body(new ValidationPipe()) body: PlantsDto): Promise<{ id: string }> {
    const generatedId = await this.plantsService.insertPlants(body.name);
    return { id: generatedId };
  }

  @Get()
  async getAllPlants(): Promise<PlantsDto[]> {
    return await this.plantsService.getPlants();
  }

  @Get(':id')
  async getPlantsById(@Param() params: IdDto): Promise<PlantsDto> {
    return await this.plantsService.getSinglePlants(params.id);
  }

  @Put(':id')
  async updatePlants(@Param() params: IdDto, @Body(new ValidationPipe()) body: PlantsDto): Promise<void> {
    await this.plantsService.updatePlants(params.id, body.name);
  }

  @Delete(':id')
  async deletePlantsById(@Param() params: IdDto): Promise<void> {
    await this.plantsService.deletePlants(params.id);
  }
}
