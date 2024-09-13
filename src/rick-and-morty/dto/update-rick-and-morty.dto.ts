import { PartialType } from '@nestjs/mapped-types';
import { CreateRickAndMortyDto } from './create-rick-and-morty.dto';

export class UpdateRickAndMortyDto extends PartialType(CreateRickAndMortyDto) {}
