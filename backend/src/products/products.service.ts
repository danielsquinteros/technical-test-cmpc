import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { memoryDB } from '../database/memory.store';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  create(body: CreateProductDto): Product {
    const product: Product = {
      id: uuid(),
      ...body,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    memoryDB.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return memoryDB.products.filter((product) => product.status);
  }

  findOneById(id: string): Product {
    const product = memoryDB.products.find(
      (product) => product.id === id && product.status,
    );
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  findByIds(ids: string[]): Product[] {
    const products: Product[] = this.findAll();
    const filteredProducts: Product[] =
      ids?.length > 0
        ? products.filter((product) => ids.includes(product.id))
        : products;
    return filteredProducts;
  }

  update(id: string, body: UpdateProductDto): Product {
    let updatedProduct = this.findOneById(id);

    memoryDB.products = memoryDB.products.map((product) => {
      if (product.id === id) {
        updatedProduct = {
          ...updatedProduct,
          ...body,
          updated_at: new Date(),
          id,
        };
        return updatedProduct;
      }
      return product;
    });

    return updatedProduct;
  }

  remove(id: string): Product {
    return this.update(id, { status: false } as UpdateProductDto);
  }
}
