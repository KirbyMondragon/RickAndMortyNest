import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RickAndMortyModule } from 'src/rick-and-morty/rick-and-morty.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[RickAndMortyModule]
})
export class SeedModule {}
