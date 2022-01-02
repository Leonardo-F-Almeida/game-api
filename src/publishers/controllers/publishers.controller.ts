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
import CreatePublisherDto from '../dto/create-publisher.dto';
import UpdatePublisherDto from '../dto/update-publisher.dto';
import PublishersService from '../services/publishers.service';

@Controller('publishers')
export default class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersService.create(createPublisherDto);
  }

  @Get()
  findAll(@Query() { take, skip, name }) {
    return this.publishersService.findAll({ take, skip, name });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.publishersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publishersService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.publishersService.remove(+id);
  }
}
