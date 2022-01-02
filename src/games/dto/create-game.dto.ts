import {
  IsArray,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export default class CreateGameDto {
  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsNumber()
  price: number;

  @IsArray()
  tags: string[];

  @IsDateString()
  releaseDate: Date;

  @IsDefined()
  @IsNumber()
  publisherId: number;
}
