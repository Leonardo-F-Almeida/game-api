import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export default class CreateGameDto {
  @ApiProperty({
    example: 'MetaCarts',
    description: 'The title of the game',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '100',
    description: 'The price of the game',
  })
  @IsDefined()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: ['adventure', 'PVP'],
    description: 'The tags of the game',
  })
  @IsArray()
  tags: string[];

  @ApiProperty({
    example: `2022-01-02`,
    description: 'The release date of the game',
  })
  @IsDateString()
  releaseDate: Date;

  @ApiProperty({
    example: `1`,
    description: 'The entity publisher id',
  })
  @IsDefined()
  @IsNumber()
  publisherId: number;
}
