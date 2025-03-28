import { React } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecommendedCollections = ({ imgURL, altTextPrefix }) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3, // Default for large screens
    slidesToScroll: 1,
    autoplay: true,
    centerMode: false, // Disabled for larger screens
    responsive: [
      {
        breakpoint: 1121,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1, // Show only 1 image
          slidesToScroll: 1,
          centerMode: true, // Enable centering
          centerPadding: "0px", // Remove side gaps
        },
      },
    ],
  };

  return (
    <>
      <div className="product-may-like category">
        <div className="container">
          <div className="wrap">
            <h2>Collections</h2>
            <p>
              A gift from Bijou Co. is the ultimate way to express your love.
            </p>
            <Slider {...settings} className="product">
              {[1, 2, 3, 4].map((item, index) => (
                <div className="img-wrap">
                  <img src={imgURL} alt={`${altTextPrefix} ${index}`} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="product-collection-sec category">
        <div className="container">
          <div className="wrap">
            <h2>Moodshot of Bracelets</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedCollections;
