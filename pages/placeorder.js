// import React, { useContext } from 'react';
// import Homepage from '../components/Homepage';
// import CheckoutWizard from '../components/CheckoutWizard';
// import Link from 'next/link';
// import { Store } from '../utils/Store';
// import Image from 'next/image';

// export default function placeOrderScreen() {
//   const { state, dispatch } = useContext(Store);
//   const { cart } = state;
//   const { cartItems, shippingAddress, paymentMethod } = cart;

//   return (
//     <Homepage title="Place Order">
//       <CheckoutWizard activeStep={3} />
//       <h1 className="mb-4 text-xl">Place Order</h1>
//       {cartItems.length === 0 ? (
//         <div>
//           Cart is empty.{' '}
//           <Link href="/" >
//             Go Shopping
//           </Link>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-4 md:gap-5">
//           <div className="overflow-x-auto md:col-span-3">
//             <div className="card p-5">
//               <h2 className="mb-2 text-lg">Shipping Address</h2>
//               <div>
//                 {shippingAddress.fullName}, {shippingAddress.address},{' '}
//                 {shippingAddress.city}, {shippingAddress.postalCode},{' '}
//                 {shippingAddress.country}
//               </div>
//               <div>
//                 <Link href="/shipping" >
//                   Edit
//                 </Link>
//               </div>
//             </div>
//             {/* </div> */}
//             <div className="card p-5">
//               <h2 className="mb-2 text-lg">Payment Method</h2>
//               <div>{paymentMethod}</div>
//               <div>
//                 <Link href="/payment" >
//                   Edit
//                 </Link>
//               </div>
//             </div>
//             <div className="card overflow-x-auto p-5">
//               <h2 className="mb-2 text-lg">Order Items</h2>
//               <table className="min-w-full">
//                 <thead className="border-b">
//                   <tr>
//                     <th className="px-5 text-left">Item</th>
//                     <th className="p-5 text-right">Quantity</th>
//                     <th className="p-5 text-right">Price</th>
//                     <th className="p-5 text-right">Subtotal</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cartItems.map((item) => (
//                     <tr key={item._id} className="border-b">
//                       <td>
//                         <Link href={`/product/${item.slug}`} legacyBehavior>
//                           <a className="flex items-center">
//                             <Image
//                               src={item.image}
//                               alt={item.name}
//                               width={50}
//                               height={50}
//                             ></Image>
//                             &nbsp;
//                             {item.name}
//                           </a>
//                         </Link>
//                       </td>
//                       <td className="p-5 text-right">{item.quantity}</td>
//                       <td className="p-5 text-right">{item.price}</td>
//                       <td className="p-5 text-right">
//                         ${item.quantity * item.price}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div>
//                 <Link href="/cart" >
//                   Edit
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Homepage>
//   );
// }
