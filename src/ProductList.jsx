import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const CartItems = useSelector(state => state.cart.items);

  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const calculateTotalQuantity = () => {
    return CartItems
      ? CartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        }
      ]
    }
  ];

  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px'
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px'
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none'
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div style={styleObjUl}>
          <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>

          <a href="#" onClick={handleCartClick} style={styleA}>
            🛒 {calculateTotalQuantity()}
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>

              <div className="product-list">
                {category.plants.map((plant, plantIndex) => {
                  const isInCart = CartItems.some(
                    item => item.name === plant.name
                  );

                  return (
                    <div className="product-card" key={plantIndex}>
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                      />

                      <div className="product-title">{plant.name}</div>
                      <div className="product-description">{plant.description}</div>
                      <div className="product-cost">{plant.cost}</div>

                      <button
                        className="product-button"
                        disabled={isInCart}
                        onClick={() => handleAddToCart(plant)}
                        style={{
                          backgroundColor: isInCart ? 'gray' : '#4CAF50',
                          cursor: isInCart ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isInCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
