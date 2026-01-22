import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const CartItems = useSelector(state => state.cart.items);

  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const calculateTotalQuantity = () => {
    return CartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // ✅ MULTIPLE CATEGORIES WITH 6+ PLANTS EACH
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters toxins from air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Improves humidity.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy care plant.", cost: "$17" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Medicinal properties.", cost: "$14" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba", description: "Calming aroma.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b", description: "Sweet fragrance.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Herbal aroma.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing scent.", cost: "$12" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Relieves stress.", cost: "$14" },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Fragrant flowers.", cost: "$22" }
      ]
    }
  ];

  return (
    <div>
      <div className="navbar">
        <h2>Paradise Nursery</h2>
        <button onClick={() => setShowCart(true)}>
          🛒 {calculateTotalQuantity()}
        </button>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>

              <div className="product-list">
                {category.plants.map((plant, idx) => {
                  const isInCart = CartItems.some(item => item.name === plant.name);

                  return (
                    <div className="product-card" key={idx}>
                      <img src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p>{plant.cost}</p>

                      <button
                        disabled={isInCart}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isInCart ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
