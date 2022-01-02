import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import CreateGameDto from '../dto/create-game.dto';
import UpdateGameDto from '../dto/update-game.dto';
import GamesService from '../services/games.service';

@Controller('games')
export default class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll(@Query() { take, skip, title }) {
    return this.gamesService.findAll({ take, skip, title });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.gamesService.findOne(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    try {
      return this.gamesService.update(id, updateGameDto);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.gamesService.remove(+id);
  }
}
