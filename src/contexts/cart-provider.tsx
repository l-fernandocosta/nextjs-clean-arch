import { Cart } from '@domain/entities/cart';
import { Product } from '@domain/entities/product';
import { container, Registry } from '@infra/container-registry';
import { ClearCartUseCase } from '@app/cart/usecases/clear-cart-use-case';
import { AddProductInCartUseCase } from '@app/cart/usecases/add-product-in-cart-use-case';
import { RemoveProductFromCartUseCase } from '@app/cart/usecases/remove-product-from-cart-use-case';

import {
  useState,
  useContext,
  useCallback,
  createContext,
  PropsWithChildren,
  useEffect,
} from 'react';
import { GetCartUseCase } from '@app/cart/usecases/get-cart-use-case';

export type CartContextType = {
  cart: Cart;
  clear: () => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  reload: () => void,
};

const defaultContext: CartContextType = {
  cart: new Cart({ products: [] }),
  addProduct: (product: Product) => { },
  removeProduct: (productId: number) => { },
  clear: () => { },
  reload: () => { },
}

const CartContext = createContext<CartContextType>({} as CartContextType);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>(defaultContext.cart);

  const addProductUseCase = container.get<AddProductInCartUseCase>(Registry.AddProductInCartCartUseCase);
  const removeProductUseCase = container.get<RemoveProductFromCartUseCase>(Registry.RemoveProductFromCartUseCase);
  const clearCartUseCase = container.get<ClearCartUseCase>(Registry.ClearCartUseCase);
  const getUseCase = container.get<GetCartUseCase>(Registry.GetCartUseCase);

  const addProduct = useCallback((product: Product) => {
    const cart = addProductUseCase.execute(product);
    setCart(cart)
  }, []);

  const removeProduct = useCallback((productId: number) => {
    const cart = removeProductUseCase.execute(productId);
    setCart(cart);
  }, []);

  const clear = () => {
    const cart = clearCartUseCase.execute();
    setCart(cart);
  };


  const reload = useCallback(() => {
    const cart = getUseCase.execute();
    setCart(cart)
  }, []);


  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <CartContext.Provider
      value={{
        cart,
        clear,
        reload,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
