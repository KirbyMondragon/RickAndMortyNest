import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RickAndMortyService } from './rick-and-morty.service';
import { CreateRickAndMortyDto } from './dto/create-rick-and-morty.dto';
import { UpdateRickAndMortyDto } from './dto/update-rick-and-morty.dto';

@Controller('rick-and-morty')
export class RickAndMortyController {
  constructor(private readonly rickAndMortyService: RickAndMortyService) {}

  @Post()
  create(@Body() createRickAndMortyDto: CreateRickAndMortyDto) {
    return this.rickAndMortyService.create(createRickAndMortyDto);
  }

  @Get()
  findAll() {
    return this.rickAndMortyService.findAll();
  }

  @Get(':termino')
  findOne(@Param('termino') termino: string) {
    return this.rickAndMortyService.findOne(termino);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRickAndMortyDto: UpdateRickAndMortyDto) {
    return this.rickAndMortyService.update(id, updateRickAndMortyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string ) {
    return this.rickAndMortyService.remove(id);
  }
}
