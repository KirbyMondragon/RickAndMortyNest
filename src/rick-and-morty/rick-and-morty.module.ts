import { Module } from '@nestjs/common';
import { RickAndMortyService } from './rick-and-morty.service';
import { RickAndMortyController } from './rick-and-morty.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RickAndMorty, RickAndMortySchema } from './entities/rick-and-morty.entity';


@Module({
  controllers: [RickAndMortyController],
  providers: [RickAndMortyService],
  imports:[
    MongooseModule.forFeature([
      {
        name: RickAndMorty.name,
        schema: RickAndMortySchema,
      }
    ])
  ],
  exports:[
    MongooseModule
  ]
})
export class RickAndMortyModule {}
