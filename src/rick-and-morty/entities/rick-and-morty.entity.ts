import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class RickAndMorty extends Document {
    @Prop({
        unique:true,
        index:true,
    })
    name:string;
    
    @Prop({
        unique:true,
        index:true,
    })
    no:string;

    @Prop({
        unique:false,
        index:true
    })
    species:string;

    @Prop({
        unique:false,
        index:true
    })
    location:string;

    

}

export const RickAndMortySchema = SchemaFactory.createForClass(RickAndMorty);
