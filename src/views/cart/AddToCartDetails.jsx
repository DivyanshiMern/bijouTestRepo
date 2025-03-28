import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bannerRing from "../../assets/images/banner-ring.png";
import "../../assets/css/custom.css";
import "../../assets/css/responsive.css";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(sessionStorage.getItem("shoppingBag")) || [];

    setCartItems(
      storedItems.map((item) => ({
        ...item,
        quantity: item.quantity || 1
      }))
    );
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      sessionStorage.setItem("shoppingBag", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      sessionStorage.removeItem("shoppingBag");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const deliveryFee = 0;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee - discount;

  const handleIncrement = (index) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity += 1;
      newItems[index].total = newItems[index].price * newItems[index].quantity;
      return newItems;
    });
  };

  const handleDecrement = (index) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      if (newItems[index].quantity > 1) {
        newItems[index].quantity -= 1;
        newItems[index].total =
          newItems[index].price * newItems[index].quantity;
      }
      return newItems;
    });
  };

  const handleRemove = (index) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((_, i) => i !== index);
      return newItems;
    });
  };

  const handleApplyDiscount = () => {
    setDiscount(0);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add("show-menu");
    } else {
      document.documentElement.classList.remove("show-menu");
    }
    return () => document.documentElement.classList.remove("show-menu");
  }, [isMenuOpen]);

  const handleCategoryClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (cartItems.length === 0) {
    return (
      <div className="section">
        <div className="shopping-cart">
          <div className="container">
            <div className="continue-wrap">
              <Link to="/" className="continue">
                CONTINUE BROWSING
              </Link>
            </div>
            <h2>Shopping Cart</h2>
            <div className="wrap empty">
                <p>Your cart is empty</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="shopping-cart">
        <div className="container">
          <div className="continue-wrap">
            <Link to="/" className="continue">
              CONTINUE BROWSING
            </Link>
          </div>
          <div className="wrap">
            <div className="left">
              <h2>Shopping Cart</h2>
              {cartItems.map((item, index) => (
                <div
                  className="cart-content"
                  key={`${item.productId}-${item.variantId}-${index}`}
                >
                  <div className="cart-left">
                    <div className="img-wrap">
                      <img src={item.image || bannerRing} alt={item.name} />
                    </div>
                  </div>
                  <div className="cart-right">
                    <div className="product-name">
                      <div className="name">{item.name}</div>
                      <div className="prize">₹ {item.total.toFixed(2)}</div>
                    </div>
                    <div className="product-detail">
                      <div className="color">
                        <p>
                          Color:{" "}
                        </p>
                        <p className="color-name">{item.color}</p>
                      </div>
                      <div className="metal">
                        <p> Metal:{" "} </p>
                        <p className="metal-name">{item.metal}</p>
                      </div>
                      {item.size ? (
                        <div className="size">
                          <p> Size:</p>
                          <p className="size-name">{item.size || "-"}</p>
                        </div>
                      ) :
                        <div className="size">
                          <p> Size:</p>
                          <p className="size-name"> - </p>
                        </div>}
                      <div className="quantity">
                        <p>Quantity</p>
                        <div className="number-wrap">
                          <button
                            className="minus"
                            onClick={() => handleDecrement(index)}
                          >
                            -
                          </button>
                          <span className="product-qty number">
                            {item.quantity}
                          </span>
                          <button
                            className="plus"
                            onClick={() => handleIncrement(index)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="remove-product">
                        <a
                          className="remove"
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="right">
              <div className="order-summary">
                <h4>Order Summary ({cartItems.length} items)</h4>
                <div className="order-subtotal">
                  Subtotal <span>₹ {subtotal.toFixed(2)}</span>
                </div>
                <div className="standard-delivery">
                  Standard Delivery <span>₹ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="discount">
                  Discount <span>₹ {discount.toFixed(2)}</span>
                </div>
                <div id="divtotal" className="total-price">
                  Total <span id="totalprice">₹ {total.toFixed(2)}</span>
                </div>
                <p>(Prices include VAT.)</p>
                <div className="coupon">
                  <input
                    type="text"
                    className="discount"
                    id="discount-code"
                    placeholder="Discount Code"
                  />
                  <button
                    type="submit"
                    className="btn"
                    onClick={handleApplyDiscount}
                  >
                    Apply
                  </button>
                </div>
                <div className="btn-wrap checkout-btn">
                  <Link to="/checkout" onClick={handleCategoryClick}>
                    <button>Checkout</button>
                  </Link>
                </div>
              </div>
              <div className="need-help">
                <h4>Need Help?</h4>
                <ul>
                  <li>
                    <p>
                      <Link to="#">Shipping & Returns</Link>
                    </p>
                  </li>
                  <li>
                    <p>
                      <Link to="#">Jewellery Care</Link>
                    </p>
                  </li>
                  <li>
                    <p>
                      <Link to="#">Privacy Policy</Link>
                    </p>
                  </li>
                  <li>
                    <p>
                      <Link to="#">Book an Appointment</Link>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
