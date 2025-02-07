import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'Nombre del producto' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 999, description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 500, description: 'Costo del producto' })
  @IsNumber()
  @IsPositive()
  cost_price: number;

  @ApiProperty({ example: 150, description: 'Cantidad disponible en stock' })
  @IsInt()
  @IsPositive()
  stock: number;

  @ApiProperty({
    example: 'notebook',
    description: 'Categoría del producto',
    enum: [
      'notebook',
      'graphic_card',
      'computer_accessory',
      'notebook_accessory',
    ],
  })
  @IsEnum({
    NOTEBOOK: 'notebook',
    GRAPHIC_CARD: 'graphic_card',
    COMPUTER_ACCESORY: 'computer_accessory',
    NOTEBOOK_ACCESORY: 'notebook_accessory',
  })
  tag: string;

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
}
