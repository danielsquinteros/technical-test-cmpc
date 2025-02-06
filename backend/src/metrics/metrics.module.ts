import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [MetricsController],
  imports: [ProductsModule],
})
export class MetricsModule {}
