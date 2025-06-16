import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsOptional, Matches, IsNumber, IsArray, IsEnum, IsBoolean} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateLocationDto {
    @ApiProperty({ description: 'Name/Titel des Ortes' })
    @IsString() @IsNotEmpty()
    name: string;

    @ApiProperty({ required: false })
    @IsString() @IsOptional()
    street?: string;

    @ApiProperty({ example: '10115', required: false })
    @IsString() @Matches(/^[0-9]{5}$/) @IsOptional()
    zip?: string;

    @ApiProperty({ required: false })
    @IsString() @IsOptional()
    city?: string;

    @ApiProperty({ required: false, default: 'Germany' })
    @IsString() @IsOptional()
    country?: string;

    @ApiProperty({ required: false })
    @IsString() @IsOptional()
    category?: string;

    @ApiProperty({ required: false, description: 'Gefahrenbeschreibung' })
    @IsString() @IsOptional()
    danger?: string;

    @ApiProperty({ required: false, default: false })
    @IsBoolean() @IsOptional()
    @Type(() => Boolean)
    temporary?: boolean;

    @ApiProperty({ 
        required: false, 
        enum: ['permanent', 'temporary', 'seasonal'],
        default: 'permanent'
    })
    @IsEnum(['permanent', 'temporary', 'seasonal']) @IsOptional()
    time_category?: string;

    @ApiProperty({ required: false, format: 'float' })
    @IsNumber() @IsOptional()
    @Type(() => Number)
    latitude?: number;

    @ApiProperty({ required: false, format: 'float' })
    @IsNumber() @IsOptional()
    @Type(() => Number)
    longitude?: number;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    image?: any;

    @ApiProperty({ required: false })
    @IsString() @IsOptional()
    description?: string;

    @ApiProperty({ required: false, type: [String], description: 'Tags zur Kategorisierung' })
    @IsArray() @IsOptional()
    @IsString({ each: true })
    tags?: string[];
}
