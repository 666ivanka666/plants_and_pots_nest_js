import { IsNotEmpty, IsString } from 'class-validator';

export class PlantsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
