import { NextPage } from 'next';
import { FormEvent } from 'react';
import { useRouter } from 'next/router';

import { useCart } from '@contexts/cart-provider';
import { container, Registry } from '@infra/container-registry';
import { ProcessOrderUseCase } from '@app/order/process-order-use-case';

type Props = {};

const Checkout: NextPage = (props: Props) => {
  const router = useRouter();
  const cartContext = useCart();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const credit_card_number = event.currentTarget.credit_card_number.value;

    const processOrderUseCase = container.get<ProcessOrderUseCase>(Registry.ProcessOrderUseCase);
    const order = await processOrderUseCase.execute({
      products: cartContext.cart.products,
      credit_cart_number: credit_card_number,
    })
    cartContext.reload()
    router.push(`/checkout/${order.id}/success`);
  }

  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <h3>Meu carrinho</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor=''>Cartão de crédito</label>
          <input
            type='text'
            id='credit_card_number'
            name='credit_card_number'
          />

          <ul>
            {cartContext?.cart.products?.map((product) => (
              <li key={product.id}>
                <label>{product.name}</label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button type='submit'>Comprar</button>
        </div>
      </form>
      <button onClick={cartContext.clear}>Limpar carrinho</button>
    </div>
  );
};

export default Checkout;
