import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PotsService } from './pots.service'; 
import { IdDto, PotsDto } from './dto'; 

@Controller('pots')
export class PotsController {
  constructor(private readonly potsService: PotsService) {}

  @Post()
  addPots(@Body() body: PotsDto): any {
    const generatedId = this.potsService.insertPots(body.name, body.plantID);
    return { id: generatedId };
  }

  @Get()
  getAllPots() {
    return this.potsService.getPots();
  }

  @Get(':id')
  getPotsById(@Param() params: IdDto) {
    return this.potsService.getSinglePots(params.id);
  }

  @Put(':id')
  updatePots(@Param() params: IdDto, @Body() body: PotsDto) {
    console.log(params);
    this.potsService.updatePlantsInPots(params.id, body.name, body.plantID);
    return null;
  }

  @Delete(':id')
  deletePotsById(@Param() params: IdDto) {
    this.potsService.deletePots(params.id);
    return null;
  }
}
