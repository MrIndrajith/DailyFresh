import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';

import breakfastImg from '../assets/breakfast.jpg';
import burgerImg from '../assets/burger.jpg';
import cameraImg from '../assets/camera.jpg';

const products = [
  { id: 1, title: 'Product 1', price: 99, img: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Product 2', price: 149, img: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Product 3', price: 199, img: 'https://via.placeholder.com/150' },
];

export default function StandardImageList() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const removeFromWishlist = (id) => setWishlist(wishlist.filter((item) => item.id !== id));
  const buyAll = () => {
    alert('Purchased all items in the cart!');
    setCart([]);
  };

  return (
    <div>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <h2>Products</h2>
      <div style={{ display: 'flex', gap: 16 }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: 16 }}>
            <img src={product.img} alt={product.title} width={100} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      <button onClick={buyAll} disabled={cart.length === 0}>Buy All</button>
      <div>
        {cart.map((item) => (
          <div key={item.id} style={{ margin: 8 }}>
            {item.title} - ${item.price}
            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 8 }}>Remove</button>
          </div>
        ))}
      </div>

      <h2>Wishlist</h2>
      <div>
        {wishlist.map((item) => (
          <div key={item.id} style={{ margin: 8 }}>
            {item.title} - ${item.price}
            <button onClick={() => removeFromWishlist(item.id)} style={{ marginLeft: 8 }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const itemData = [
  { img: breakfastImg, title: 'Breakfast' },
  { img: burgerImg, title: 'Burger' },
  { img: cameraImg, title: 'Camera' },
];

import React from 'react';

export default function ProductCard({ img, title, price }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      width: '200px',
      textAlign: 'center',
      margin: '8px'
    }}>
      <img
        src={img}
        alt={title}
        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3>{title}</h3>
      <p>${price}</p>
    </div>
  );
}