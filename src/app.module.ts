import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RickAndMortyModule } from './rick-and-morty/rick-and-morty.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    RickAndMortyModule,
    MongooseModule.forRoot("mongodb://localhost:27017/rick-and-morty"),
    SeedModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
