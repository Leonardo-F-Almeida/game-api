import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from '../../helpers/pagination-query';
import CreatePublisherDto from '../dto/create-publisher.dto';
import UpdatePublisherDto from '../dto/update-publisher.dto';
import PublishersService from '../services/publishers.service';

export class PublishersPagination extends PaginationQuery {
  @ApiPropertyOptional({
    title: 'Part of the name of the publisher to search',
    default: '',
  })
  name: string;
}

@ApiTags('publishers')
@Controller('publishers')
export default class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a publisher' })
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersService.create(createPublisherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find publishers' })
  findAll(@Query() publishersPagination: PublishersPagination) {
    return this.publishersService.findAll(publishersPagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find publisher by id' })
  findOne(@Param('id') id: number) {
    return this.publishersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a publisher' })
  update(
    @Param('id') id: number,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publishersService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a publisher' })
  remove(@Param('id') id: number) {
    return this.publishersService.remove(+id);
  }
}
