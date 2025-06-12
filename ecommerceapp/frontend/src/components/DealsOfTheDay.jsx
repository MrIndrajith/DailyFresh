import React, { useState } from 'react';
import breakfastImg from '../assets/breakfast.jpg';
import burgerImg from '../assets/burger.jpg';
import cameraImg from '../assets/camera.jpg';

const products = [
  { id: 1, title: 'Breakfast', price: 99, img: breakfastImg },
  { id: 2, title: 'Burger', price: 99, img: burgerImg },
  { id: 3, title: 'Camera', price: 99, img: cameraImg },
  { id: 4, title: 'Product Name', price: 99, img: 'https://via.placeholder.com/150' },
];

export default function DealsOfTheDay() {
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
      <h2>Deals of the Day</h2>
      <div style={{ display: 'flex', gap: 24 }}>
        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            width: '220px',
            textAlign: 'center'
          }}>
            <img src={product.img} alt={product.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px' }} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => addToWishlist(product)} style={{ marginLeft: 8 }}>Add to Wishlist</button>
          </div>
        ))}
      </div>

      <h3>Cart</h3>
      <button onClick={buyAll} disabled={cart.length === 0}>Buy All</button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 8 }}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Wishlist</h3>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => removeFromWishlist(item.id)} style={{ marginLeft: 8 }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}