import React from "react";
import facebook from "../assets/images/facebook.svg";
import whatsapp from "../assets/images/whatsapp.svg";
import instagram from "../assets/images/instagram.svg";
import footer_logo from "../assets/images/footer_logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { categories } = useSelector((state) => state.category);

  const handleCategoryClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="wrap">
          <div className="footer-abt">
            <h3>ABOUT US</h3>
            <p>
              Bijou Co is where diamonds meet your story—modern, playful, and
              uniquely yours. Crafted with sustainability in mind, our lab-grown
              jewellery is designed for every occasion, from the everyday hustle
              to life's biggest milestones.
            </p>
            <div className="footer-social-wrap">
              <a
                className="faceb"
                href="https://www.facebook.com/surties.india"
              >
                <img src={facebook} alt="facebook" />
              </a>
              <a
                className="whats"
                href="https://wa.link/jeou1k"
                target="_blank"
              >
                <img src={whatsapp} alt="whatsapp" />
              </a>
              <a
                className="insta"
                href="https://www.instagram.com/surtiesnews/?hl=en"
              >
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
          <div className="footer-client">
            <h3>CLIENT CARE</h3>
            <ul className="footer-client-menu">
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Track your order</a>
              </li>
              <li>
                <Link to="/bookAppointment">Book an appointment</Link>
              </li>
              <li>
                <a href="#">Frequently Asked Questions</a>
              </li>
              <li>
                <Link to="/shippingPolicy">Shipping and Returns</Link>
              </li>
              <li>
                <Link to="/returnPolicy">Return Policy</Link>
              </li>
              <li>
                <Link to="/privacyPolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refundPolicy">Refund Policy</Link>
              </li>
              <li>
                <Link to="/termsAndConditions">Terms and Conditions</Link>
              </li>

              <li>
                <a href="#">Jewellery Care</a>
              </li>
            </ul>
          </div>
          <div className="footer-shop">
            <h3>SHOP</h3>
            <ul className="footer-shop-menu">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/category/${category.name}/${category.id}`}
                    onClick={handleCategoryClick}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-logo">
            <div className="logo-wrap">
              <Link to="/" onClick={handleClick}>
                <img src={footer_logo} alt="footer-logo" />
              </Link>
            </div>
            <p>
              Be the first to know about our latest collections, offers, special
              events, store openings, and more!
            </p>
            <div className="forms">
              <form action="#">
                <div className="form-control">
                  <input type="email" placeholder="Email" className="email" />
                  <div className="button">
                    <input type="button" value="Sign Up" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
