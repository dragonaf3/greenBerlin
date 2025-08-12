import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ unique: true, sparse: true })
    email?: string;

    @Prop()
    firstName?: string;

    @Prop()
    lastName?: string;

    @Prop({ default: 'user' })
    role?: string;

    @Prop()
    name?: string;

    @Prop({ default: 'none' })
    avatar?: string;

    @Prop({ unique: true, sparse: true })
    id?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);