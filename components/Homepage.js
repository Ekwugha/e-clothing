import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import DropdownLink from '../components/DropdownLink';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';

export default function Homepage({ title, children }) {
  const { status, data: session } = useSession();
  // we use this to be able to see how many items been added to cart in the ui
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((a, currentItem) => a + currentItem.quantity, 0)
    );
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    // remove cart after logout
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      <Head>
        <title>{title ? title + ' - E-clothing' : 'E-clothing'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

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

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Items>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Items>
                    {/* order history */}
                    <Menu.Items>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Items>
                    {/* logout */}
                    <Menu.Items>
                      <DropdownLink className="dropdown-link" href="#" onClick={logoutClickHandler}>
                        Logout
                      </DropdownLink>
                    </Menu.Items>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" legacyBehavior>
                  <a className="p-2">Login</a>
                </Link>
              )}
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
