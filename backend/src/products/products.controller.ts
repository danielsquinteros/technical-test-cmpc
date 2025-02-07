/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('products') // Categoría en Swagger
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado', type: Product })
  create(@Body() createProductDto: CreateProductDto): Product {
    try {
      return this.productsService.create(createProductDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Error creating product', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener productos' })
  @ApiResponse({ status: 200, description: 'Productos obtenido', type: Product, isArray: true })
  findAll(): Product[] {
    try {
      return this.productsService.findAll();
    } catch (error) {
      throw new HttpException(
        { message: 'Error fetching products', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto' })
  @ApiResponse({ status: 200, description: 'Producto obtenido', type: Product })
  findOne(@Param('id', ParseUUIDPipe) id: string): Product {
    try {
      const product = this.productsService.findOneById(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      throw new HttpException(
        { message: 'Error fetching product', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: Product })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto): Product {
    try {
      const updatedProduct = this.productsService.update(id, updateProductDto);
      if (!updatedProduct) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return updatedProduct;
    } catch (error) {
      throw new HttpException(
        { message: 'Error updating product', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado', type: Product })
  remove(@Param('id', ParseUUIDPipe) id: string): Product {
    try {
      const deletedProduct = this.productsService.remove(id);
      if (!deletedProduct) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return deletedProduct;
    } catch (error) {
      throw new HttpException(
        { message: 'Error deleting product', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
