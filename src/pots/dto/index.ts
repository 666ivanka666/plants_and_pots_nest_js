import { IsNotEmpty, IsString } from 'class-validator';

export class PotsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
