import '../styles/globals.css';
import type { AppProps } from 'next/app';
import MyCart from '../components/my-cart';
import { CartProvider } from '../contexts/cart-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <MyCart />
      <Component {...pageProps} />
    </CartProvider>
  );
}
