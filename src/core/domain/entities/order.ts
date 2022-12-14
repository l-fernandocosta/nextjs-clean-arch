import { Product } from './product';

export type OrderProps = {
  id?: number;
  products: Product[];
  credit_cart_number: string;
};

export class Order {
  constructor(public props: OrderProps) {}

  get id() {
    return this.props.id;
  }

  get products() {
    return this.props.products;
  }

  get creditCardNumber() {
    return this.props.credit_cart_number;
  }

  get total() {
    return this.props.products.reduce((acc, product) => acc + product.price, 0);
  }

  toJSON() {
    return {
      id: this.id,
      products: this.products,
      credit_card_number: this.creditCardNumber,
    };
  }
}
