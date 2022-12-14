import { Order } from '@domain/entities/order';

export interface OrderGateway {
  insert(order: Order): Promise<Order>;
  findById(id: number): Promise<Order>;
}
