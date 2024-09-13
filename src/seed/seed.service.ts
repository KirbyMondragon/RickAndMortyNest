import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { RickAndMorty } from 'src/rick-and-morty/entities/rick-and-morty.entity';
import { RickAndMortyResponse } from './interface/rick-and-morty-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(RickAndMorty.name)
    private readonly rickAndMortyModel: Model<RickAndMorty>,
  ) {}

  async executeSEED() {
    // Eliminar todos los registros de la colección RickAndMorty
    await this.rickAndMortyModel.deleteMany({});

    // Hacer la solicitud HTTP usando axios directamente
    const { data } = await axios.get<RickAndMortyResponse>('https://rickandmortyapi.com/api/character');

    //Array para almacenar los personajes de Rick and Morty a insertar
    const charactersToInsert: { no: number; name: string;  species: string; location: string }[] = [];

    // Recorrer los resultados de la API y extraer la información necesaria
    data.results.forEach(({ name, id, species, location }) => {
      const no = id; // Tomamos el ID como el número del personaje
      const locationName = location.name; // Nombre de la ubicación

      charactersToInsert.push({ name, no, species, location: locationName });
    });

    // Insertar los personajes en la base de datos
    await this.rickAndMortyModel.insertMany(charactersToInsert);
    
    return charactersToInsert;
  }
}
