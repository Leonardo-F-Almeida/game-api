import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreatePublisherDto {
  @ApiProperty({
    example: 'Ultra',
    description: 'The title of the publisher',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123',
    description: 'The siret of the publisher',
  })
  @IsDefined()
  @IsNumber()
  siret: number;

  @ApiProperty({
    example: '+552299999999',
    description: 'The phone of the publisher',
  })
  @IsNotEmpty()
  phone: string;
}
