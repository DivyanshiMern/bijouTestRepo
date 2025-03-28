import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import earring_img from "../../assets/images/earing_img.jpg";
import silverEarring from "../../assets/images/silverEarring.png";
import product_benifit from "../../assets/images/product-benefit-img.png";

const ProductDetails = () => {
  const { uniqueProductId, categoryId, categoryName } = useParams();
  const { categories } = useSelector((state) => state.category);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const miniImagesRef = useRef([]);
  const bigImagesRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const product = categories
    .flatMap((cat) => [
      ...cat.products,
      ...cat.subcategories.flatMap((sub) => sub.products),
    ])
    .find((p) => p.uniqueProductId === uniqueProductId);

  const handleAddToBag = () => {
    if (!selectedVariant) return;

    if (selectedVariant.productSizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size before adding to bag"); // Changed to error for better UX
      return;
    }

    const bagItem = {
      productId: uniqueProductId,
      variantId: selectedVariant.id,
      name: product.name,
      quantity: quantity,
      price: totalPrice,
      total: quantity * totalPrice,
      size: selectedSize,
      metal: selectedMetal,
      color: selectedColor,
      image: selectedVariant.images?.[0]?.image || "",
    };

    const existingBag = sessionStorage.getItem("shoppingBag");
    let bagItems = existingBag ? JSON.parse(existingBag) : [];

    const existingItemIndex = bagItems.findIndex(
      (item) =>
        item.productId === bagItem.productId &&
        item.variantId === bagItem.variantId &&
        item.size === bagItem.size
    );

    if (existingItemIndex > -1) {
      bagItems[existingItemIndex].quantity += quantity;
      bagItems[existingItemIndex].total =
        bagItems[existingItemIndex].quantity *
        bagItems[existingItemIndex].price;
    } else {
      bagItems.push(bagItem);
    }

    sessionStorage.setItem("shoppingBag", JSON.stringify(bagItems));
    window.dispatchEvent(new Event("cartUpdated")); // Dispatch event to update Header
    toast.success(`${product.name} has been added to your bag. Please check!`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      bigImagesRef.current.forEach((item, i) => {
        if (item) {
          const offsetTop = item.offsetTop;
          const offsetBottom = offsetTop + item.offsetHeight;
          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetBottom
          ) {
            setActiveIndex(i);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.add("product-page");
    return () => document.body.classList.remove("product-page");
  }, []);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      const initialVariant = product.variants[0];
      setSelectedVariant(initialVariant);
      setSelectedColor(initialVariant.color);
      setSelectedMetal(
        initialVariant.materialName.toLowerCase() === "gold"
          ? `${initialVariant.metalQualities[0].quality}K ${initialVariant.materialName}`
          : `${initialVariant.metalQualities[0].quality} ${initialVariant.materialName}`
      );
    }
  }, [product]);

  const toggleContent = (event) => {
    event.preventDefault();
    setIsActive(!isActive);
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: false,
    responsive: [
      { breakpoint: 1121, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  const handleMiniImageClick = (index, event) => {
    event.preventDefault();
    setActiveIndex(index);
    if (bigImagesRef.current[index]) {
      window.scrollTo({
        top: bigImagesRef.current[index].offsetTop,
        behavior: "smooth",
      });
    }
  };

  if (!product || !selectedVariant) {
    return <div>Product not found.</div>;
  }

  const parseProductDescription = (description) =>
    description
      ?.split(/<\/?p>/)
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim()) || [];

  const productDescriptionLines = parseProductDescription(
    selectedVariant?.description
  );

  const getPriceBreakdownDetails = (variant) => {
    const breakdownDetails = [];
    const metalPrice =
      (Number(variant?.metalRates?.[0]?.rate) || 0) *
      (Number(variant?.weight) || 0);
    breakdownDetails.push({
      name: productDescriptionLines[1] || `${variant.materialName} Price`,
      value: `₹ ${metalPrice}`,
    });
    breakdownDetails.push({
      name: `Diamond (${variant.diamondWeight || "0"})`,
      value: `₹ ${variant?.diamondPrice || 0}`,
    });
    const subtotal =
      metalPrice +
      Number(variant?.diamondPrice || 0) +
      Number(variant?.makingCharges || 0);
    const tax = subtotal * 0.05;
    breakdownDetails.push({
      name: "Making Charge",
      value: `₹ ${variant?.makingCharges || 0}`,
    });
    breakdownDetails.push({ name: "Tax (5%)", value: `₹ ${tax.toFixed(2)}` });
    return breakdownDetails;
  };

  const priceBreakdownDetails = getPriceBreakdownDetails(selectedVariant);
  const totalPrice = priceBreakdownDetails.reduce(
    (sum, detail) =>
      sum +
      (isNaN(parseFloat(detail.value.replace("₹ ", "").replace(",", "")))
        ? 0
        : parseFloat(detail.value.replace("₹ ", "").replace(",", ""))),
    0
  );

  const uniqueColors = [
    ...new Set(product.variants.map((variant) => variant.color.trim())),
  ];
  const uniqueMetals = [
    ...new Set(
      product.variants.flatMap((variant) =>
        variant.metalQualities.map((metal) =>
          variant.materialName.toLowerCase() === "gold"
            ? `${metal.quality}K ${variant.materialName}`
            : `${metal.quality} ${variant.materialName}`
        )
      )
    ),
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const matchingVariant = product.variants.find(
      (variant) => variant.color === color
    );
    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      setSelectedMetal(
        matchingVariant.materialName.toLowerCase() === "gold"
          ? `${matchingVariant.metalQualities[0].quality}K ${matchingVariant.materialName}`
          : `${matchingVariant.metalQualities[0].quality} ${matchingVariant.materialName}`
      );
      setSelectedSize(null);
      setActiveIndex(0);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMetalSelect = (metal) => {
    setSelectedMetal(metal);
    const matchingVariant = product.variants.find((variant) =>
      variant.metalQualities.some(
        (metalQuality) =>
          (variant.materialName.toLowerCase() === "gold"
            ? `${metalQuality.quality}K ${variant.materialName}`
            : `${metalQuality.quality} ${variant.materialName}`) === metal
      )
    );
    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      setSelectedColor(matchingVariant.color);
      setSelectedSize(null);
      setActiveIndex(0);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSizeSelect = (size) => setSelectedSize(size);
  const availableSizes = selectedVariant?.productSizes || [];

  return (
    <div className="section">
      <div className="product-ban-sec" style={{ marginBottom: "20px" }}>
        <div className="container">
          <ul className="breadcrumb mobile">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/category/${categoryName}/${categoryId}`}>
                {categoryName}
              </Link>
            </li>
            <li className="active">{product?.name}</li>
          </ul>
          <div className="wrap">
            <div className="images-content">
              <div className="images-wrap">
                <div className="mini-images-wrap">
                  <ul className="mini-images">
                    {selectedVariant?.images?.map((img, index) => (
                      <li key={img.id || index}>
                        <div className="img-wrap">
                          <a
                            href="#"
                            className={activeIndex === index ? "active" : ""}
                            onClick={(e) => handleMiniImageClick(index, e)}
                            ref={(el) => (miniImagesRef.current[index] = el)}
                          >
                            <img src={img.image} alt={product.name} />
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="big-images-wrap">
                  <ul className="big-images">
                    {selectedVariant?.images?.map((img, index, arr) => (
                      <li
                        key={img.id || index}
                        ref={(el) => (bigImagesRef.current[index] = el)}
                      >
                        <div className="img-wrap">
                          <img src={img.image} alt={`earing-img-${index}`} />
                        </div>
                        {index === 1 && arr[2] && (
                          <div className="img-wrap">
                            <img src={arr[2].image} alt={`earing-img-2`} />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="main-product-content">
              <div className="product-wrap">
                <ul className="breadcrumb desktop">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to={`/category/${categoryName}/${categoryId}`}>
                      {categoryName}
                    </Link>
                  </li>
                  <li className="active">{product?.name}</li>
                </ul>
                <h1>{product?.name}</h1>
                <p className="discription">Details & Description</p>
                <p
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedVariant?.productDescription ||
                      product?.productDescription,
                  }}
                ></p>
                <ul
                  className="pro-features"
                  dangerouslySetInnerHTML={{
                    __html: selectedVariant?.description,
                  }}
                ></ul>
                <div className="color">
                  <p>Color</p>
                  <div className="btn-wrap">
                    {uniqueColors.map((color, index) => (
                      <button
                        key={index}
                        className={`color-btn ${color
                          .replace(/\s+/g, "-")
                          .toLowerCase()} ${
                          selectedColor === color ? "active" : ""
                        }`}
                        onClick={() => handleColorSelect(color)}
                      ></button>
                    ))}
                  </div>
                </div>
                <div className="metal">
                  <p>Metal</p>
                  <div className="btn-wrap">
                    {uniqueMetals.map((metal, index) => (
                      <button
                        key={index}
                        className={selectedMetal === metal ? "active" : ""}
                        onClick={() => handleMetalSelect(metal)}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="size">
                  <div className="text-wrap">
                    <p>
                      Size{" "}
                      {availableSizes.length > 0 && (
                        <span className="required">*</span>
                      )}
                    </p>
                    <a href="#">Size Guide</a>
                  </div>
                  <div className="size-btn-wrap">
                    {availableSizes.map((size) => (
                      <button
                        key={size.value}
                        className={selectedSize === size.value ? "active" : ""}
                        onClick={() => handleSizeSelect(size.value)}
                      >
                        {size.value}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedColor !== "Silver" && (
                  <div className="prize-breakup">
                    <a
                      href="#"
                      onClick={toggleContent}
                      className={isActive ? "active" : ""}
                    >
                      Price Breakdown
                    </a>
                    {isActive && (
                      <div className="content">
                        <ul>
                          {priceBreakdownDetails.map((detail, index) => (
                            <li key={index}>
                              <div className="product-name">{detail.name}</div>
                              <div className="product-prize">
                                {detail.value}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                <div className="quantity">
                  <p>Quantity</p>
                  <div className="number-wrap">
                    <button className="minus" onClick={handleDecrease}>
                      -
                    </button>
                    <span className="product-qty number">{quantity}</span>
                    <button className="plus" onClick={handleIncrease}>
                      +
                    </button>
                  </div>
                </div>
                <button className="add-to-bag" onClick={handleAddToBag}>
                  <div className="prize">
                    ₹ {Number((quantity * totalPrice).toFixed(2))}
                  </div>
                  <div className="add-to-cart">Add to Bag</div>
                </button>
                <Link to={"/bookAppointment"} className="book-appoitnment">
                  <button
                    className="appointment"
                    style={{ marginBottom: "30px" }}
                  >
                    Book an appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-feat-sec" style={{ marginTop: "20px" }}>
        <div className="wrap">
          <ul className="marquee__group">
            <li>FREE SHIPPING ON ALL INTL. ORDERS OVER RS.35,000 INR</li>
            <li>2-YEAR WARRANTY</li>
            <li>LIFETIME REPLATING</li>
            <li>ETHICALLY SOURCED</li>
            <li>SUSTAINABLE</li>
          </ul>
          <ul className="marquee__group" aria-hidden="true">
            <li>FREE SHIPPING ON ALL INTL. ORDERS OVER RS.35,000 INR</li>
            <li>2-YEAR WARRANTY</li>
            <li>LIFETIME REPLATING</li>
            <li>ETHICALLY SOURCED</li>
            <li>SUSTAINABLE</li>
          </ul>
        </div>
      </div>
      <div className="product-may-like">
        <div className="container">
          <div className="wrap">
            <h2>You may also like</h2>
            <Slider {...settings} className="product">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <div className="img-wrap" key={index}>
                  <img src={earring_img} alt="earring image" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="product-benefit-sec">
        <div className="container">
          <div className="wrap">
            <div className="left">
              <h2>The Bijou Benefit</h2>
              <p>
                The Bijou Benefit is not just about jewellery—it's about
                creating a better experience. Enjoy complimentary shipping,
                mindful packaging, and small benefits that make a big difference
                with every purchase.
              </p>
            </div>
            <div className="right">
              <ul>
                <li>Complimentary Shipping & Returns</li>
                <li>Sustainable & Reusable Packaging</li>
                <li>Buy Online, Doorstep Delivery</li>
                <li>Book an Appointment</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="img-wrap">
          <img src={product_benifit} alt="Bijou Benefit" />
        </div>
      </div>
      <div className="product-related-sec">
        <div className="container">
          <div className="wrap">
            <h2>Related Products</h2>
            <Slider {...settings} className="product">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <div className="img-wrap" key={index}>
                  <img src={silverEarring} alt="earring image" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* <div className="product-related-sec">
        <div className="container">
          <div className="wrap">
            <h2>Related Products</h2>
            <Slider {...settings} className="product">
              {[
                silverEarring,
                gold_earring,
                silver_earring,
                // goldBracelet,
                // pendantNecklace
              ].map((image, index) => (
                <div className="img-wrap" key={index}>
                  <img src={image} alt={`product image ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div> */}

      <div className="product-collection-sec category">
        <div className="container">
          <div className="wrap">
            <h2>Bijou Collection</h2>
            <p>
              Inspired by the fire and radiance of our superlative diamonds,
              Tiffany Victoria uses a unique combination of cuts for a
              distinctly romantic sensibility. The beautiful shape of these
              classic diamond earrings allows the stones to play off of each
              other's glorious sheen.
            </p>
            <div className="btn-wrap">
              <a href="#">Shop the Collection</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
