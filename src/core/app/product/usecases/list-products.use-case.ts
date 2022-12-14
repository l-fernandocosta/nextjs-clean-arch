import { Product } from '@domain/entities/product';
import { ProductGateway } from '@domain/gateways/product.gateway';

export class ListProductsUseCase {
  constructor(private gateway: ProductGateway) {}

  async execute(): Promise<Product[]> {
    return await this.gateway.findAll();
  }
}
