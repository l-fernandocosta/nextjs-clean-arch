import { Cart } from '@domain/entities/cart';
import { CartGateway } from '@domain/gateways/cart.gateway';

export class RemoveProductFromCartUseCase {
  constructor(private cart: CartGateway) {}

  execute(productId: number): Cart {
    const cart = this.cart.get();
    cart.removeProduct(productId);
    this.cart.save(cart);
    return cart;
  }
}
