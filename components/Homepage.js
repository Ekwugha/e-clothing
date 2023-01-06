import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';

export default function Homepage({ title, children }) {
  // we use this to be able to see how many items been added to cart in the ui
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce(
      (a, currentItem) => a + currentItem.quantity,
      0
    ))
  }, [cart.cartItems]);
  return (
    <>
      <Head>
        <title>{title ? title + ' - E-clothing' : 'E-clothing'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        {/* HEADER */}
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <p className="text-lg font-bold">E-clothing</p>
            </Link>
            <div>
              <Link href="/cart" legacyBehavior>
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login" legacyBehavior>
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        {/* MAIN SECTION */}
        <main className="container m-auto mt-4 px-4">{children}</main>
        {/* FOOTER */}
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright &copy; {new Date().getFullYear()} E-clothing </p>
        </footer>
      </div>
    </>
  );
}
