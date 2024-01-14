import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// const Product = (props) => {
const Product = ({ product, handleAddToCart }) => {
  //   console.log(props.product);
  //   console.log(props);
  //   const { handleAddToCart } = props;
  //   const {product, handleAddToCart} = props;
//   const { name, img, seller, price, ratings } = props.product;
  const { name, img, seller, price, ratings } = product;

  return (
    <div className='product'>
      <img src={img} alt='' />
      <div className='product-info'>
        <p className='product-name'>{name}</p>
        <p>Price: ${price}</p>
        <p>
          <small>Seller: {seller}</small>
        </p>
        <p>
          <small>Ratings: {ratings} stars</small>
        </p>
      </div>
      <button
        // onClick={() => props.handleAddToCart(props.product)}
        onClick={() => handleAddToCart(product)}
        className='btn-cart'
      >
        <p className='btn-text'>Add to Cart</p>
        <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default Product;
