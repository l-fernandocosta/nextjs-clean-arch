import { Order } from '@domain/entities/order';
import { Product } from '@domain/entities/product';
import { CartGateway } from '@domain/gateways/cart.gateway';
import { OrderGateway } from '@domain/gateways/order.gateway';
import { OrderHttpGateway } from '@infra/gateways/order-http.gateway';

export class ProcessOrderUseCase {
  constructor(
    private ProcessOrderGateway: OrderHttpGateway,
    private cart: CartGateway
  ) {}

  async execute({
    products,
    credit_cart_number,
  }: {
    products: Product[];
    credit_cart_number: string;
  }) {
    const order = new Order({
      products,
      credit_cart_number,
    });

    const newOrder = await this.ProcessOrderGateway.insert(order);
    const cart = this.cart.get();
    cart.clear();
    this.cart.save(cart);
    return newOrder;
  }
}
