import 'reflect-metadata';
import { http } from './http';
import { Container } from 'inversify';

import { GetCartUseCase } from '@app/cart/usecases/get-cart-use-case';
import { GetProductUseCase } from '@app/product/usecases/get-product-by-id-use-case';
import { ListProductsUseCase } from '@app/product/usecases/list-products.use-case';
import { CartLocalStorageGateway } from './gateways/cart-local-storage.gateway';
import { ProductHttpGateway } from './gateways/product-http.gateway';
import { AddProductInCartUseCase } from '@app/cart/usecases/add-product-in-cart-use-case';
import { ClearCartUseCase } from '@app/cart/usecases/clear-cart-use-case';
import { RemoveProductFromCartUseCase } from '@app/cart/usecases/remove-product-from-cart-use-case';
import { ProcessOrderUseCase } from '@app/order/process-order-use-case';
import { OrderGateway } from '@domain/gateways/order.gateway';
import { OrderHttpGateway } from './gateways/order-http.gateway';
import { Order } from '@domain/entities/order';

export const container = new Container();
export const Registry = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  ProductGateway: Symbol.for('ProductGateway'),
  OrderGateway: Symbol.for('OrderGateway'),
  CartGateway: Symbol.for('CartGateway'),

  GetCartUseCase: Symbol.for('GetCartUseCase'),
  ClearCartUseCase: Symbol.for('ClearCartUseCase'),
  GetProductUseCase: Symbol.for('GetProductUseCase'),
  ListProductsUseCase: Symbol.for('ListProductsUseCase'),
  AddProductInCartCartUseCase: Symbol.for('AddProductInCartUseCase'),
  RemoveProductFromCartUseCase: Symbol.for('RemoveProductFromCartUseCase'),
  ProcessOrderUseCase: Symbol.for('ProcessOrderUseCase'),
};

// http
container.bind(Registry.AxiosAdapter).toConstantValue(http);

// gateways
container.bind(Registry.ProductGateway).toDynamicValue((ctx) => {
  return new ProductHttpGateway(ctx.container.get(Registry.AxiosAdapter));
});
container.bind(Registry.CartGateway).to(CartLocalStorageGateway);

container.bind(Registry.OrderGateway).toDynamicValue((ctx) => {
  return new OrderHttpGateway(ctx.container.get(Registry.AxiosAdapter));
});

// usecases
container.bind(Registry.ListProductsUseCase).toDynamicValue((ctx) => {
  return new ListProductsUseCase(ctx.container.get(Registry.ProductGateway));
});

container.bind(Registry.GetProductUseCase).toDynamicValue((ctx) => {
  return new GetProductUseCase(ctx.container.get(Registry.ProductGateway));
});

container.bind(Registry.GetCartUseCase).toDynamicValue((ctx) => {
  return new GetCartUseCase(ctx.container.get(Registry.CartGateway));
});

container.bind(Registry.AddProductInCartCartUseCase).toDynamicValue((ctx) => {
  return new AddProductInCartUseCase(ctx.container.get(Registry.CartGateway));
});

container.bind(Registry.RemoveProductFromCartUseCase).toDynamicValue((ctx) => {
  return new RemoveProductFromCartUseCase(
    ctx.container.get(Registry.CartGateway)
  );
});

container.bind(Registry.ClearCartUseCase).toDynamicValue((ctx) => {
  return new ClearCartUseCase(ctx.container.get(Registry.CartGateway));
});

container.bind(Registry.ProcessOrderUseCase).toDynamicValue((ctx) => {
  return new ProcessOrderUseCase(
    ctx.container.get(Registry.OrderGateway),
    ctx.container.get(Registry.CartGateway)
  );
});
