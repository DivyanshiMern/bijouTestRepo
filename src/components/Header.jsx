import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import search_icon from "../assets/images/search_icon.svg";
import logo from "../assets/images/logo.png";
import calender_icon from "../assets/images/calender_icon.svg";
import public_icon from "../assets/images/public_icon.svg";
import cart_icon from "../assets/images/cart-icon.svg";
import "../assets/css/custom.css";
import "../assets/css/responsive.css"
import { useNavigate } from "react-router-dom";



const API_URL = `${import.meta.env.VITE_APP_HOST}/api/v1/search/globalSearch`;


const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const { categories, loading, error } = useSelector((state) => state.category);
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  const handleSearchClick = (type, id,name) => {
    setShowSearch(false);
    setSearchQuery("")
    navigate(`/productList?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}&name=${encodeURI(name)}`);
  };
  console.log(searchQuery);
  
  const updateCartCount = () => {
    const shoppingBag = JSON.parse(sessionStorage.getItem("shoppingBag")) || [];
    const totalCount = shoppingBag.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalCount);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Fetch search results with debounce
  const fetchSearchResults = useCallback(
    async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const { data } = await axios.get(`${API_URL}?searchQuery=${query}`);
        setSearchResults(data.data);
      } catch (error) {
        console.error("Search API Error:", error);
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, fetchSearchResults]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setSearchQuery("")
      }
    };
    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <header id="header" className={isSticky ? "fixed" : ""}>
      <div className="header-top">
        <div className="container">
          <div className="wrap">
            <div className="left">
              {/* Search Icon */}
              <div className="img-wrap" onClick={() => setShowSearch(true)}>
                <img src={search_icon} alt="search-icon" />
              </div>

              <Link to="/contact" onClick={handleCategoryClick}>
                Contact
              </Link>
            </div>
            <div className="middle">
              <div className="header-logo">
                <Link to="/" onClick={handleCategoryClick}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="right">
              <div className="icons-wrap">
                <div className="calender">
                  <Link to={"/bookAppointment"}>
                    <img src={calender_icon} alt="calender-icon" />
                  </Link>
                </div>
                <div className="public">
                  <Link to="/myAccount" onClick={handleCategoryClick}>
                    <img src={public_icon} alt="public-icon" />
                  </Link>
                </div>
                <div className="cart">
                  <Link to="/addToCart" onClick={handleCategoryClick}>
                    <img src={cart_icon} alt="cart-icon" />
                    {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Box (Visible only when search is active) */}
        {showSearch && (
          <div className="search-container" ref={searchRef}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus
            />

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <ul className="search-dropdown">
                {searchResults.map((item) => (
                  <li key={item.id || item.name} onClick={() => handleSearchClick(item.type, item.id,item.name)}>
                    {item.name} 
                    {/* <span className="search-type">({item.type})</span> */}
                  </li>
                ))}
              </ul>
            )}

            {isSearching && <div className="loading">Searching...</div>}
          </div>
        )}
      </div>

      <div className="header-bottom">
        <div className="container">
          <div className="wrap-nav-section">
            <div className="menu" onClick={() => setIsMenuOpen((prev) => !prev)}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>

            <nav className="nav">
              <div className={`header-nav ${isMenuOpen ? "open" : ""}`} id="desktop-nav" style={{ right: isMenuOpen ? "0" : "-100%" }}>
                <div className="close-button" onClick={() => setIsMenuOpen(false)}>
                  <i className="fa fa-times"></i>
                </div>

                <ul className="nav-section">
                  {loading ? (
                    <li>Loading...</li>
                  ) : error ? (
                    <li>Error: {error}</li>
                  ) : (
                    categories
                      .filter((category) => {
                        const hasProducts = category.products?.length > 0;
                        const hasSubcategoryProducts =
                          Array.isArray(category.subcategories) &&
                          category.subcategories.some(
                            (subcat) =>
                              Array.isArray(subcat.products) &&
                              subcat.products.length > 0
                          );

                        return hasProducts || hasSubcategoryProducts;
                      })
                      .map((category) => {
                        const isActive =
                          location.pathname ===
                          `/category/${category.name}/${category.id}`;

                        return (
                          <li key={category.id}>
                            <Link
                              to={`/category/${category.name}/${category.id}`}
                              onClick={handleCategoryClick}
                              className={isActive ? "active" : ""}
                            >
                              {category.name}
                            </Link>
                          </li>
                        );
                      })
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;