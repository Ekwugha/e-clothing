import Link from 'next/link';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import Homepage from '../components/Homepage';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function CartScreen() {
  // access the context and get cart from it
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  // get access to the cart from the state to be able to get the cartItems
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <Homepage title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.{' '}
          <Link href="/">
            <button className="primary-button">Go Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-xauto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr key={item.slug} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`} legacyBehavior>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  {' '}
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button onClick={() => router.push('/shipping')} className="primary-button w-full">Check Out</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Homepage>
  );
}
