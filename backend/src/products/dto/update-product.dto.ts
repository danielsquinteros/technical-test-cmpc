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

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @MinLength(1)
  @IsOptional()
  name: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  cost_price: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  min_stock: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  max_stock: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsEnum({
    NOTEBOOK: 'notebook',
    GRAPHIC_CARD: 'graphic_card',
    COMPUTER_ACCESORY: 'computer_accessory',
    NOTEBOOK_ACCESORY: 'notebook_accessory',
  })
  tag: string;
}
