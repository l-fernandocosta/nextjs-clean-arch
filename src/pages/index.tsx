import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { ListProductsUseCase } from '@app/product/usecases/list-products.use-case';

import { container, Registry } from '@infra/container-registry';
import { ProductProps } from '@domain/entities/product';

type HomeProps = {
  products: ProductProps[];
};

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <div>
      <h1>e-commerce fc</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <label>Produto: {product.name}</label>
            <Link href={`/products/${product.id}`} passHref>
              Ver produto
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const useCase = container.get<ListProductsUseCase>(
    Registry.ListProductsUseCase
  );

  const products = await useCase.execute();
  return {
    props: {
      products: products.map((product) => product.toJSON()),
    },
  };
};

export default Home;
