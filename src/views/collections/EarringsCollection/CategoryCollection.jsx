import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import earring_img from "../../../assets/images/earing_img.jpg";
import RecommendedCollections from "../RecommendedCollections";

const ITEMS_PER_PAGE = 20;

const CategoryCollection = () => {
  const { categoryId, categoryName } = useParams();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [currentPage, setCurrentPage] = useState(1);

  const selectedCategory =
    categories.find((cat) => cat.id === categoryId) || {};

  const allSubCategoryProducts = (selectedCategory.subcategories || []).reduce(
    (acc, subcategory) => {
      return acc.concat(subcategory.products || []);
    },
    []
  );

  const selectedProducts = selectedCategory.products || [];
  const products =
    selectedProducts.length === 0 ? allSubCategoryProducts : selectedProducts;

  const subcategories = selectedCategory.subcategories || [];
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const displayedProducts = products.slice(0, currentPage * ITEMS_PER_PAGE);

  const calculatePrice = (variant) => {
    return (
      (Number(variant?.metalRates[0]?.rate) || 0) *
        (Number(variant?.weight) || 0) +
      (Number(variant?.makingCharges) || 0) +
      (Number(variant?.diamondPrice) || 0)
    ).toFixed(2);
  };

  const handleAddToBag = (product, e) => {
    e.preventDefault();

    const defaultVariant = product.variants[0];
    const price = calculatePrice(defaultVariant);

    const bagItem = {
      productId: product.uniqueProductId,
      variantId: defaultVariant.id,
      name: product.name,
      quantity: 1,
      price: Number(price),
      total: Number(price),
      size: null,
      metal:
        defaultVariant.materialName.toLowerCase() === "gold"
          ? `${defaultVariant.metalQualities[0].quality}K ${defaultVariant.materialName}`
          : `${defaultVariant.metalQualities[0].quality} ${defaultVariant.materialName}`,
      color: defaultVariant.color,
      image:
        defaultVariant.images?.[0]?.image || product.profileImage || earring_img
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
      bagItems[existingItemIndex].quantity += 1;
      bagItems[existingItemIndex].total =
        bagItems[existingItemIndex].quantity *
        bagItems[existingItemIndex].price;
    } else {
      bagItems.push(bagItem);
    }

    sessionStorage.setItem("shoppingBag", JSON.stringify(bagItems));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="section">
      <div className="bracelet-cat-sec-top">
        <div className="container">
          <div className="wrap">
            <h1>{categoryName}</h1>
            <ul className="subcategory-list">
              {subcategories
                .filter((sub) => sub.products && sub.products.length > 0)
                .map((sub) => (
                  <li key={sub.id}>
                    <Link
                      to={`/category/${categoryName}/${categoryId}/subcategory/${sub.name}/${sub.id}`}
                      className="subcategory-link"
                    >
                      <div className="img-wrap">
                        <img
                          src={sub.coverImage || earring_img}
                          alt={sub.name}
                        />
                      </div>
                    </Link>
                    <div className="content">
                      <p>{sub.name}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bracelet-cat-sec-bottom">
        <div className="container">
          <div className="wrap">
            <ul className="breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="active">{categoryName}</li>
            </ul>
            <div className="product-listing">
              {loading ? (
                <p className="text-center mt-4 text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-center mt-4 text-red-500">{error}</p>
              ) : displayedProducts.length === 0 ? (
                <p className="text-center mt-4 text-gray-500">
                  No products found in this category.
                </p>
              ) : (
                <>
                  <ul>
                    {displayedProducts.map((product) => (
                      <li key={product.uniqueProductId}>
                        <Link
                          to={`/category/${categoryName}/${categoryId}/productDetail/${product.uniqueProductId}`}
                        >
                          <div className="normal">
                            <div className="img-wrap">
                              <img
                                src={
                                  product.profileImage ||
                                  product.variants[0]?.images[0]?.image ||
                                  earring_img
                                }
                                alt={product.name}
                              />
                            </div>
                          </div>
                          <div className="hover-content">
                            <div className="img-wrap">
                              <img
                                src={
                                  product.profileImage ||
                                  product.variants[0]?.images[0]?.image ||
                                  earring_img
                                }
                                alt={product.name}
                              />
                            </div>
                            <div className="product-details mt-2">
                              <p className="product-detail-name font-semibold">
                                {product.name}
                              </p>
                              <button
                                className="add-to-bag bg-black text-white px-4 py-2 w-full mt-2"
                                onClick={(e) => handleAddToBag(product, e)}
                              >
                                <div className="prize">
                                  ₹{" "}
                                  {(
                                    (Number(
                                      product.variants[0]?.metalRates[0]?.rate
                                    ) || 0) *
                                      (Number(product.variants[0]?.weight) ||
                                        0) +
                                    (Number(
                                      product.variants[0]?.makingCharges
                                    ) || 0) +
                                    (Number(
                                      product.variants[0]?.diamondPrice
                                    ) || 0)
                                  ).toFixed(2)}
                                </div>
                                <div className="add-to-cart">Add to Bag</div>
                              </button>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="pagination text-center mt-4">
                    Showing {displayedProducts.length} of {totalProducts}
                  </p>
                  {currentPage < totalPages && (
                    <div className="view-more text-center mt-4">
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        View More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="product-feat-sec">
        <div className="wrap">
          <ul className="marquee__group">
            <li>FREE SHIPPING ON ALL INTL. ORDERS OVER RS.35,000 INR</li>
            <li>2-YEAR WARRANTY</li>
            <li>LIFETIME REPLATING</li>
            <li>ETHICALLY SOURCED</li>
            <li>SUSTAINABLE</li>
          </ul>
        </div>
      </div>
      <RecommendedCollections
        imgURL={earring_img}
        altTextPrefix={categoryName}
      />
    </div>
  );
};

export default CategoryCollection;
