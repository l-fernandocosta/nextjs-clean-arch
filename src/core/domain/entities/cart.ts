import { Product } from './product';

export type CartProps = {
  products: Product[];
};

export class Cart {
  constructor(public props: CartProps) {}

  clear() {
    this.props.products = [];
  }
  get total(): number {
    return this.props.products.reduce((acc, product) => acc + product.price, 0);
  }

  get products() {
    return this.props.products;
  }
  addProduct(product: Product) {
    this.props.products.push(product);
  }

  removeProduct(productId: number) {
    this.props.products.filter((product) => product.id !== productId);
  }
}
