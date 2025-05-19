import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop()
    street?: string;

    @Prop()
    zip?: string;

    @Prop()
    city?: string;

    @Prop()
    category?: string;

    @Prop({ default: false })
    temporary?: boolean;

    @Prop()
    latitude?: number;

    @Prop()
    longitude?: number;

    @Prop()
    image?: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);