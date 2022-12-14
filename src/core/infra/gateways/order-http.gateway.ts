import { AxiosInstance } from 'axios';
import { Order } from '@domain/entities/order';
import { Product } from '@domain/entities/product';
import { OrderGateway } from '@domain/gateways/order.gateway';

export class OrderHttpGateway implements OrderGateway {
  constructor(private readonly http: AxiosInstance) {}

  async insert(order: Order): Promise<Order> {
    return this.http.post('/orders', order.toJSON()).then((res) => {
      order.props.id = res.data.id;
      return order;
    });
  }

  async findById(id: number): Promise<Order> {
    return this.http.post(`/orders/${id}`).then(
      (res) =>
        new Order({
          id: res.data.id,
          products: res.data.products.map(
            (product: Product) =>
              new Product({
                id: product.id,
                description: product.description,
                name: product.name,
                price: product.price,
              })
          ),
          credit_cart_number: res.data.credit_card_number,
        })
    );
  }
}
