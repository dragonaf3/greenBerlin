import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
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

    @Prop({ default: 'Germany' })
    country?: string;

    @Prop()
    category?: string;

    @Prop()
    danger?: string;

    @Prop({ default: false })
    temporary?: boolean;

    @Prop({ type: String, enum: ['permanent', 'temporary', 'seasonal'], default: 'permanent' })
    time_category?: string;

    @Prop()
    latitude?: number;

    @Prop()
    longitude?: number;

    @Prop()
    image?: string;

    @Prop([String])
    tags?: string[];

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user?: Types.ObjectId;

    @Prop({ default: Date.now })
    date?: Date;

    @Prop({ unique: true, sparse: true })
    incident_id?: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);