import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

//Part 1 Start
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // fetch(
    //   'https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json'
    // )
    // console.log('product load before fetch');
    fetch('products.json')
      .then((res) => res.json())
      // .then(data => console.log(data))
      .then((data) => {
        setProducts(data);
        // console.log('product loaded');
      });
  }, []);

  //Part 1 End

  ////Part 4 Start
  useEffect(() => {
    // console.log('Local Storage First Line', products);
    const storedCart = getShoppingCart();

    // console.log(storedCart);
    //  console.log(storedCart['4bf9798f-63bc-4a83-b0c6-6a3b816fe922']);

    const savedCart = [];
    for (const id in storedCart) {
      //  console.log(id);

      const addedProduct = products.find((product) => product.id === id);

      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
        // console.log(addedProduct);
        // console.log(addedProduct, quantity);
      }
    }
    setCart(savedCart);
    // console.log('Local Storage Finished');
  }, [products]);
  // }, []);

  //Part 4 End

  //Part 3 Start
  const handleAddToCart = (selectedProduct) => {
    // console.log('clicked');
    // console.log(product);

    //Part 5 Start
    let newCart = [];
    const exists = cart.find((product) => product.id === selectedProduct.id);

    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];

    }
    else{
      const rest = cart.filter((product) => product.id !== selectedProduct.id);

      exists.quantity = exists.quantity + 1;

      newCart = [...rest, exists];
    }

    //Part 5 End

    /* 
    const newCart = [...cart, selectedProduct];
    */

    setCart(newCart);
    addToDb(selectedProduct.id);
  };

  //Part 3 End

  //Part 2 Start
  return (
    <div className='shop-container'>
      {/* .products-container+.cart-container */}
      <div className='products-container'>
        {/* <h3>This is for product: {products.length }</h3> */}
        {products.map((product) => (
          //   <Product key={product.id}>{console.log(product)}</Product>
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className='cart-container'>
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;

//Part 2 End
