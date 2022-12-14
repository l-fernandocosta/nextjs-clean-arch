import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { useCart } from '../../contexts/cart-provider';
import { container, Registry } from '@infra/container-registry';
import { GetProductUseCase } from '@app/product/usecases/get-product-by-id-use-case';
import { Product, ProductProps } from '@domain/entities/product';

type ProductDetailPageProps = {
  product: ProductProps;
};

export const ProductDetailsPage: NextPage<ProductDetailPageProps> = ({
  product,
}) => {
  const cart = useCart();
  const productEntity = new Product({ ...product })
  return (
    <div>
      <h3>{product.name}</h3>
      <label>Preço</label>
      {product.price}
      <button onClick={() => cart.addProduct(productEntity)}>
        Adicionar no carrinho
      </button>
    </div>
  );
};

export default ProductDetailsPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params || {};
  const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase);
  const product = await useCase.execute(+id!); // o + converte para inteiro e o assertion null garante que existe

  return {
    props: {
      product: product.toJSON(),
    },
  };
};
