import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRickAndMortyDto } from './dto/create-rick-and-morty.dto';
import { UpdateRickAndMortyDto } from './dto/update-rick-and-morty.dto';
import { isValidObjectId, Model } from 'mongoose';
import { RickAndMorty } from './entities/rick-and-morty.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RickAndMortyService {

  constructor(
    @InjectModel(RickAndMorty.name)
    private readonly RickAndMortyModel:Model <RickAndMorty>,
  ){}

  public async create(createRickAndMortyDto: CreateRickAndMortyDto) {
    
    createRickAndMortyDto.name = createRickAndMortyDto.name.toLocaleLowerCase();
    createRickAndMortyDto.location = createRickAndMortyDto.location.toLocaleLowerCase();
    createRickAndMortyDto.species = createRickAndMortyDto.species.toLocaleLowerCase();
    console.log(createRickAndMortyDto)
    try {
      const Character = await this.RickAndMortyModel.create(createRickAndMortyDto);
      return Character;
    } catch (error) {
      throw new BadRequestException(`The caracter exists in the database ${ JSON.stringify(error.keyValue)}`)
    }

  }

   findAll() {
    try {
      const Character = this.RickAndMortyModel.find()
      return Character;
    } catch (error) {
      throw new BadRequestException(`${ JSON.stringify(error.keyValue)}`)

    }
  }

  async findOne(termino: string) {
    let Character: RickAndMorty;

      if (!isNaN(+termino)){
        Character = await this.RickAndMortyModel.findOne({no:termino.toLocaleLowerCase().trim()})
  
      } 
      if (!Character && isValidObjectId(termino)){
        Character = await this.RickAndMortyModel.findById(termino)
        
      }
      if (!Character){
        Character = await this.RickAndMortyModel.findOne({name:termino.toLocaleLowerCase().trim()})
      }
      if(!Character){
        throw new NotFoundException(`The Character with ${termino } don't exist`)
      }

      return Character;
   
  }


  async update(id: string, updateRickAndMortyDto: UpdateRickAndMortyDto) {
    try {
      const character = await this.RickAndMortyModel.findOne();

      if(character){
        updateRickAndMortyDto.name = updateRickAndMortyDto.name.toLocaleLowerCase().trim()
        updateRickAndMortyDto.location = updateRickAndMortyDto.location.toLocaleLowerCase().trim()
        updateRickAndMortyDto.species = updateRickAndMortyDto.species.toLocaleLowerCase().trim()
      }
      await character.updateOne(updateRickAndMortyDto);
      return {...character.toJSON(), ...updateRickAndMortyDto};
    } catch (error) {
      
    }
    

    
  }

  async remove(id: string) {
    try {
      const {deletedCount} = await this.RickAndMortyModel.deleteOne({_id:id});
      if(deletedCount === 0){
        throw new NotFoundException(`The character is not found ${id}`)
      }

    } catch (error) {
      throw new BadRequestException(`${id} doesn't exits`)
    } 
    
  }
}
