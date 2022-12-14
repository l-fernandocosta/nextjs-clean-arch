import { http } from '@infra/http';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Order } from '../../../utils/models';

type CheckoutSuccessPageProps = {
  order: Order;
};

const CheckoutSuccessPage: NextPage<CheckoutSuccessPageProps> = ({ order }) => {
  return (
    <div>
      <h3>Parabéns, compra {order.id} concluída com sucesso. </h3>
      <h2>Você comprou os produtos: </h2>
      <ul>
        {order.products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutSuccessPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params || {};
  const { data: order } = await http.get(`orders/${id}`);

  return {
    props: {
      order,
    },
  };
};
