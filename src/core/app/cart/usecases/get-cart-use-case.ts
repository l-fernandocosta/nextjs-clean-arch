import { Cart } from '@domain/entities/cart';
import { CartGateway } from '@domain/gateways/cart.gateway';

export class GetCartUseCase {
  constructor(private CartGate: CartGateway) {}

  execute(): Cart {
    return this.CartGate.get();
  }
}
