import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiPropertyOptional({
    title: 'the numbers of registers to skip',
    default: 0,
  })
  skip: number;

  @ApiPropertyOptional({
    title: 'the numbers of registers to take',
    default: 10,
  })
  take: number;
}
