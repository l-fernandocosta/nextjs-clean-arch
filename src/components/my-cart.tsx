import Link from 'next/link';
import { useCart } from '../contexts/cart-provider';

const MyCart = () => {
  const { cart } = useCart();
  return (
    <nav>
      Cart - Total ${cart.total} | {cart.products.length} Items
      <Link href={'/checkout'}>See checkout</Link>
    </nav>
  );
};

export default MyCart;
