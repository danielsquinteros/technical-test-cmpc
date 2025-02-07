import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    description: 'Unique identifier for the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public id: string;

  @ApiProperty({ description: 'Name of the product', example: 'Laptop' })
  public name: string;

  @ApiProperty({ description: 'Price of the product', example: 999.99 })
  public price: number;

  @ApiProperty({ description: 'Cost price of the product', example: 500.0 })
  public cost_price: number;

  @ApiProperty({ description: 'Available stock quantity', example: 150 })
  public stock: number;

  @ApiProperty({
    description: 'Availability status of the product',
    example: true,
  })
  public status: boolean;

  @ApiProperty({ description: 'Product tag', example: 'computer_accessory' })
  public tag: string;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-02-06T14:48:00.000Z',
  })
  public updated_at: Date;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-02-01T10:00:00.000Z',
  })
  public created_at: Date;

  @ApiProperty({
    description: 'Minimum stock',
    example: 10,
    required: false,
  })
  public min_stock?: number;

  @ApiProperty({
    description: 'Maximum stock',
    example: 500,
    required: false,
  })
  public max_stock?: number;

  constructor(
    id: string,
    name: string,
    price: number,
    cost_price: number,
    stock: number,
    status: boolean,
    tag: string,
    updated_at: Date,
    created_at: Date,
    min_stock?: number,
    max_stock?: number,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.cost_price = cost_price;
    this.stock = stock;
    this.status = status;
    this.tag = tag;
    this.updated_at = updated_at;
    this.created_at = created_at;
    this.min_stock = min_stock;
    this.max_stock = max_stock;
  }
}
