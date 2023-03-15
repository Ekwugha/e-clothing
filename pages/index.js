import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Homepage from '../components/Homepage';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // we use the dispatch inside the add to carthandler
  const addToCartHandler = async (product) => {
    // if we have a certain product in the cart then increase the quantity
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    // This makes sure you don't add more than the amount of product in stock
    if (data.countInStock < quantity) {
      return toast.error('Sorry, Product is out of stock');
    }
    // we use the dispatch inside the add to carthandler
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <Homepage title="Home page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Homepage>
  );
}

export async function getServerSideProps() {
  // this makes connection to the database
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
