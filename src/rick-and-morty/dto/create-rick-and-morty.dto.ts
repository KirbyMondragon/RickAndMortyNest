import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";


export class CreateRickAndMortyDto {

    @IsNumber()
    @IsPositive()
    @Min(1)
    no?:number;

    @IsString()
    @MinLength(2)
    name:string;

    @IsString()
    @MinLength(2)
    species:string;

    @IsString()
    @MinLength(2)
    location:string;
}


