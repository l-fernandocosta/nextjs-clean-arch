import { Cart } from '@domain/entities/cart';
import { CartGateway } from '@domain/gateways/cart.gateway';

export class ClearCartUseCase {
  constructor(private CartGateway: CartGateway) {}

  execute(): Cart {
    const cart = this.CartGateway.get();
    cart.clear();
    this.CartGateway.save(cart);

    return cart;
  }
}
