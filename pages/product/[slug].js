import Image from 'next/image';
import Link from 'next/link';
import  { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Homepage from '../../components/Homepage';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

export default function ProductScreen() {
  // define the state and dispatch
  const { state, dispatch } = useContext(Store);
  // use it to redirect to another page
  const router = useRouter();
  // we use this to get the product(name, slug e.t.c) from the url
  const { query } = useRouter();
  // then from the query we get slug where we can get the product
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }

  // we use the dispatch inside the add to carthandler
  const addToCartHandler = () => {
    // if we have a certain product in the cart then increase the quantity
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // This makes sure you don't add more than the amount of product in stock
    if (product.countInStock < quantity) {
      alert('Sorry, Product is out of stock');
      return;
    }
    // we use the dispatch inside the add to carthandler
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // redirect user to the cart page after clicking add to cart
    router.push('/cart');
  };

  return (
    <Homepage title={product.name}>
      <div className="py-2">
        <Link href="/">
          <button className="primary-button">Back to product</button>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="card md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            className="rounded shadow"
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Desription: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Homepage>
  );
}
