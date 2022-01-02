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
import { ApiOperation, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from '../../helpers/pagination-query';
import CreateGameDto from '../dto/create-game.dto';
import UpdateGameDto from '../dto/update-game.dto';
import GamesService from '../services/games.service';

export class GamesPagination extends PaginationQuery {
  @ApiPropertyOptional({
    title: 'Part of the title of the game to search',
    default: '',
  })
  title: string;
}

@ApiTags('games')
@Controller('games')
export default class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create game' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find games' })
  findAll(@Query() gamesPagination: GamesPagination) {
    return this.gamesService.findAll(gamesPagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one game by id' })
  findOne(@Param('id') id: number) {
    try {
      return this.gamesService.findOne(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a game by id' })
  update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    try {
      return this.gamesService.update(id, updateGameDto);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a game by id' })
  remove(@Param('id') id: number) {
    return this.gamesService.remove(id);
  }
}
