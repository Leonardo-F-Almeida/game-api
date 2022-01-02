import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreatePublisherDto {
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNumber()
  siret: number;

  @IsNotEmpty()
  phone: string;
}
