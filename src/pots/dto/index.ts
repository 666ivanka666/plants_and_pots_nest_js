import { IsNotEmpty, IsString } from 'class-validator';

export class PotsDtoCreate {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class PotsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  plantID: string;
}

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
