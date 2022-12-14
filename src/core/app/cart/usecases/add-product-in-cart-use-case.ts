import { Cart } from '@domain/entities/cart';
import { Product } from '@domain/entities/product';
import { CartGateway } from '@domain/gateways/cart.gateway';

export class AddProductInCartUseCase {
  constructor(private cart: CartGateway) {}

  execute(product: Product): Cart {
    const cart = this.cart.get();
    cart.addProduct(product);
    this.cart.save(cart);
    return cart;
  }
}
