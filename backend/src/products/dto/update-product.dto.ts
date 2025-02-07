import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsInt,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  IsPositive,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    example: 'Laptop',
    description: 'Nombre del producto',
    required: false,
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 999,
    description: 'Precio del producto',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @ApiProperty({
    example: 500.0,
    description: 'Costo del producto',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  cost_price: number;

  @ApiProperty({
    example: 150,
    description: 'Cantidad disponible en stock',
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @ApiProperty({
    example: 10,
    description: 'Stock mínimo recomendado',
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  min_stock: number;

  @ApiProperty({
    example: 500,
    description: 'Stock máximo permitido',
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  max_stock: number;

  @ApiProperty({
    example: true,
    description: 'Estado del producto (activo o inactivo)',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty({
    example: 'notebook',
    description: 'Categoría del producto',
    enum: [
      'notebook',
      'graphic_card',
      'computer_accessory',
      'notebook_accessory',
    ],
    required: false,
  })
  @IsEnum({
    NOTEBOOK: 'notebook',
    GRAPHIC_CARD: 'graphic_card',
    COMPUTER_ACCESORY: 'computer_accessory',
    NOTEBOOK_ACCESORY: 'notebook_accessory',
  })
  tag: string;
}
