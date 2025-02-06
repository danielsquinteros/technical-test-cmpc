import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { GetMetricsProducts } from './dto/get-metrics-product.dto';
import { Product } from '../products/entities/product.entity';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('products/total')
  getProductsTotal(@Body() body?: GetMetricsProducts) {
    const productSelectedIds: string[] = body?.productIds;
    const filteredProducts: Product[] =
      this.productsService.findByIds(productSelectedIds);

    return {
      total_products: filteredProducts.length,
    };
  }

  @Post('products/profit-margin')
  getProductsProfitMargin(@Body() body?: GetMetricsProducts) {
    const productSelectedIds: string[] = body?.productIds;
    const filteredProducts: Product[] =
      this.productsService.findByIds(productSelectedIds);

    const colorByProfit = (profit) => {
      if (profit < 30) {
        return 'rgba(222,45,38,0.8)';
      }
      if (profit > 50) {
        return 'rgb(14, 202, 80)';
      }
      return 'rgba(204,204,204,1)';
    };

    const productsProfitMarginSorted = filteredProducts
      .map((p) => {
        const profitMargin = Math.round(
          ((p.price - p.cost_price) / p.price) * 100,
        );
        return {
          name: p.name,
          profitMargin: profitMargin,
          color: colorByProfit(profitMargin),
        };
      })
      .sort((a, b) => b.profitMargin - a.profitMargin);

    return [
      {
        x: productsProfitMarginSorted.map((p) => p.name),
        y: productsProfitMarginSorted.map((p) => p.profitMargin),
        marker: {
          color: productsProfitMarginSorted.map((p) => p.color),
        },
        text: productsProfitMarginSorted.map((p) => p.profitMargin).map(String),
        type: 'bar',
      },
    ];
  }

  @Post('products/critical-stock')
  getProductsCriticalStock(@Body() body?: GetMetricsProducts) {
    const productSelectedIds: string[] = body?.productIds;
    const filteredProducts: Product[] =
      this.productsService.findByIds(productSelectedIds);

    const filteredProductsSorted = filteredProducts.sort(
      (a, b) => b.min_stock - a.min_stock,
    );

    return [
      {
        x: filteredProductsSorted.map((p) => p.name),
        y: filteredProductsSorted.map((p) => p.stock),
        type: 'bar',
        text: filteredProductsSorted.map((p) => p.stock).map(String),
        textposition: 'auto',
        name: 'Stock disponible',
        opacity: 0.5,
        marker: {
          color: 'rgb(158,202,225)',
          line: {
            color: 'rgb(25, 34, 47)',
            width: 1.5,
          },
        },
      },
      {
        x: filteredProductsSorted.map((p) => p.name),
        y: filteredProductsSorted.map((p) => p.min_stock),
        type: 'bar',
        text: filteredProductsSorted.map((p) => p.min_stock).map(String),
        textposition: 'auto',
        name: 'Stock mínimo',
        opacity: 0.5,
        marker: {
          color: 'rgb(225, 158, 158)',
          line: {
            color: 'rgb(99, 10, 10)',
            width: 1.5,
          },
        },
      },
    ];
  }
  @Post('products/group-tag')
  getProductsGroupByTag(@Body() body?: GetMetricsProducts) {
    const productSelectedIds: string[] = body?.productIds;
    const filteredProducts: Product[] =
      this.productsService.findByIds(productSelectedIds);

    const { total_stock, tags } = filteredProducts.reduce(
      (acc, { tag, stock }) => {
        acc.total_stock += stock;
        acc.tags[tag] = (acc.tags[tag] || 0) + stock;
        return acc;
      },
      { total_stock: 0, tags: {} as Record<string, number> },
    );

    return [
      {
        labels: Object.keys(tags),
        values: Object.values(tags).map((stock) =>
          Math.round((stock / total_stock) * 100),
        ),
        type: 'pie',
      },
    ];
  }
}
