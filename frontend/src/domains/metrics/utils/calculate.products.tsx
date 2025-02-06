import { Product} from '../../products/types'
import { PieTrace, Trace } from '../types';
export const profitMargin = (products: Product[]): Trace[] => {
  const colorByProfit = (profit: number) => {
    if (profit < 30) {
      return 'rgba(222,45,38,0.8)';
    }
    if (profit > 50) {
      return 'rgb(14, 202, 80)';
    }
    return 'rgba(204,204,204,1)';
  };

  const productsProfitMarginSorted = products
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
export const groupByTag = (products: Product[]): PieTrace[] => {
    const { total_stock, tags } = products.reduce(
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
export const criticalStock = (products: Product[]): Trace[] => {
    return [
        {
          x: products.map((p) => p.name),
          y: products.map((p) => p.stock),
          type: 'bar',
          text: products.map((p) => p.stock).map(String),
          textposition: 'auto',
          name: 'Stock available',
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
          x: products.map((p) => p.name),
          y: products.map((p) => p.min_stock ?? 0),
          type: 'bar',
          text: products.map((p) => p.min_stock).map(String),
          textposition: 'auto',
          name: 'Stock minimum',
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