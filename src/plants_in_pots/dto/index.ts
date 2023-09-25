import { IsNotEmpty, IsString } from 'class-validator';

export class PlantsINPotsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
