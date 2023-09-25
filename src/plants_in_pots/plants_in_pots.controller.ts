import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlantsInPotsService } from './plants-in-pots.service'; 
import { IdDto, PlantsInPotsDto } from './dto';

@Controller('plants-in-pots') 
export class PlantsInPotsController {
  constructor(private readonly plantsInPotsService: PlantsInPotsService) {}

  @Post()
  async addPlantsInPots(@Body() body: PlantsInPotsDto): Promise<{ id: string }> {
    const generatedId = await this.plantsInPotsService.insertPlantsInPots(body.name);
    return { id: generatedId };
  }

  @Get()
  async getAllPlantsInPots(): Promise<any[]> {
    return await this.plantsInPotsService.getPlantsInPots();
  }

  @Get(':id')
  async getPlantsInPotsById(@Param() params: IdDto): Promise<any> {
    return await this.plantsInPotsService.getSinglePlantsInPots(params.id);
  }

  @Put(':id')
  async updatePlantsInPots(@Param() params: IdDto, @Body() body: PlantsInPotsDto): Promise<void> {
    console.log(params);
    await this.plantsInPotsService.updatePlantsInPots(params.id, body.name);
  }

  @Delete(':id')
  async deletePlantsInPotsById(@Param() params: IdDto): Promise<void> {
    await this.plantsInPotsService.deletePlantsInPots(params.id);
  }
}
