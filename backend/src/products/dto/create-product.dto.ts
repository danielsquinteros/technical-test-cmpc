import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  cost_price: number;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsEnum({
    NOTEBOOK: 'notebook',
    GRAPHIC_CARD: 'graphic_card',
    COMPUTER_ACCESORY: 'computer_accessory',
    NOTEBOOK_ACCESORY: 'notebook_accessory',
  })
  tag: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  min_stock: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  max_stock: number;
}
