// src/locations/dto/create-location.dto.ts
import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsOptional, Matches, IsNumber} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateLocationDto {
    @ApiProperty() @IsString() @IsNotEmpty()
    name: string;

    @ApiProperty() @IsString() @IsNotEmpty()
    street: string;

    @ApiProperty({example: '10115'})
    @IsString() @Matches(/^[0-9]{5}$/)
    zip: string;

    @ApiProperty() @IsString() @IsNotEmpty()
    city: string;

    @ApiProperty() @IsString() @IsNotEmpty()
    category: string;

    @ApiProperty({required: false, format: 'float'})
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    latitude?: number;

    @ApiProperty({required: false, format: 'float'})
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    longitude?: number;

    @ApiProperty({type: 'string', format: 'binary', required: false})
    @IsOptional()
    image?: any;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    description?: string;
}
