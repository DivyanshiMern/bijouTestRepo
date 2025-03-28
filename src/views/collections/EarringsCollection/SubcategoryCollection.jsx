import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import earring_img from "../../../assets/images/earing_img.jpg";
import RecommendedCollections from "../RecommendedCollections";

const SubCategoryCollection = () => {
  const { categoryId, categoryName, subCategoryId, subCategoryName } =
    useParams();
  const { categories, loading, error } = useSelector((state) => state.category);

  const selectedCategory = categories.find((cat) => cat.id === categoryId) || {
    subcategories: []
  };
  const selectedSubCategory = selectedCategory.subcategories?.find(
    (sub) => sub.id === subCategoryId
  ) || { products: [] };
  const products = selectedSubCategory.products || [];

  if (loading) {
    return <p className="text-center mt-4 text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }

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
    window.dispatchEvent(new Event("cartUpdated")); // Notify header
  };

  return (
    <div className="section">
      <div className="bracelet-cat-sec-top">
        <div className="container">
          <div className="wrap">
            <h1>{subCategoryName}</h1>
            <ul className="subcategory-list">
              {/* No nested subcategories needed */}
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
              <li>
                <Link to={`/category/${categoryName}/${categoryId}`}>
                  {categoryName}
                </Link>
              </li>
              <li className="active">{subCategoryName}</li>
            </ul>

            <div className="product-listing">
              {products.length > 0 ? (
                <ul>
                  {products.map((product) => (
                    <li key={product.uniqueProductId}>
                      <Link
                        to={`/category/${categoryName}/${categoryId}/productDetail/${product.uniqueProductId}`}
                      >
                        <img
                          src={
                            product.profileImage ||
                            product.variants[0]?.images[0]?.image ||
                            earring_img
                          }
                          alt={product.name}
                        />
                      </Link>
                      <div className="product-details">
                        <p className="product-detail-name">{product.name}</p>
                        <button
                          className="add-to-bag"
                          onClick={(e) => handleAddToBag(product, e)}
                        >
                          <div className="prize">
                            ₹{" "}
                            {(
                              (Number(
                                product.variants[0]?.metalRates[0]?.rate
                              ) || 0) *
                                (Number(product.variants[0]?.weight) || 0) +
                              (Number(product.variants[0]?.makingCharges) ||
                                0) +
                              (Number(product.variants[0]?.diamondPrice) || 0)
                            ).toFixed(2)}
                          </div>
                          <div className="add-to-cart">Add to Bag</div>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center mt-4 text-gray-500">
                  No products found in this subcategory.
                </p>
              )}
              <p className="pagination text-center mt-4">
                Showing {products.length} of {products.length}
              </p>
              <div className="back-to-return text-center mt-4">
                <a href="#">Back to Top</a>
              </div>
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
          <ul className="marquee__group" aria-hidden="true">
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
        altTextPrefix={subCategoryName}
      />
    </div>
  );
};

export default SubCategoryCollection;