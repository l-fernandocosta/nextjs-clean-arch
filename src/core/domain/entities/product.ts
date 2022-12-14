export type ProductProps = {
  id: number;
  name: string;
  description: string;
  price: number;
};

class Product {
  constructor(public props: ProductProps) {}

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  get description(): string {
    return this.props.description;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
    };
  }
}

export { Product };
