import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Homepage from '../../components/Homepage';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

export default function ProductScreen(props) {
  const { product } = props;
  // define the state and dispatch
  const { state, dispatch } = useContext(Store);
  // use it to redirect to another page
  const router = useRouter();
  if (!product) {
    return <Homepage title="Product Not Found">Product Not Found</Homepage>;
  }

  // we use the dispatch inside the add to carthandler
  const addToCartHandler = async () => {
    // if we have a certain product in the cart then increase the quantity
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    // This makes sure you don't add more than the amount of product in stock
    if (data.countInStock < quantity) {
      return toast.error('Sorry, Product is out of stock');
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

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
