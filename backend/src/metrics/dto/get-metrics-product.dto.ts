import { IsArray, IsOptional } from 'class-validator';

export class GetMetricsProducts {
  @IsArray()
  @IsOptional()
  productIds: string[];
}
