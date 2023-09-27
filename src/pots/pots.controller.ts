import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PotsService } from './pots.service';
import { IdDto, PotsDtoCreate, PotsDtoUpdate } from './dto';

@Controller('pots')
export class PotsController {
  constructor(private readonly potsService: PotsService) {}

  @Post()
  addPots(@Body() body: PotsDtoCreate): any {
    const generatedId = this.potsService.insertPots(body.name);
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
  updatePots(@Param() params: IdDto, @Body() body: PotsDtoUpdate) {
    return this.potsService.updatePots(params.id, body.name, body.plantID);
  }

  @Delete(':id')
  deletePotsById(@Param() params: IdDto) {
    return this.potsService.deletePots(params.id);
  }
}
