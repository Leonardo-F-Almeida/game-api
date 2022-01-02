import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublishersController from './controllers/publishers.controller';
import Publisher from './entities/publisher.entity';
import PublishersService from './services/publishers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublishersService],
  exports: [PublishersService],
  controllers: [PublishersController],
})
export class PublishersModule {}
