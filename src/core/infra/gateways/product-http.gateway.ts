import { AxiosInstance } from 'axios';
import { Product } from '@domain/entities/product';
import { ProductGateway } from '@domain/gateways/product.gateway';

export class ProductHttpGateway implements ProductGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(): Promise<Product[]> {
    return await this.http.get<Product[]>(`products`).then((res) =>
      res.data.map(
        (product) =>
          new Product({
            id: product.id,
            description: product.description,
            name: product.name,
            price: product.price,
          })
      )
    );
  }

  async findById(id: number): Promise<Product> {
    return await this.http.get<Product>(`products/${id}`).then((res) => {
      return new Product({
        id: res.data.id,
        price: res.data.price,
        name: res.data.description,
        description: res.data.description,
      });
    });
  }
}
