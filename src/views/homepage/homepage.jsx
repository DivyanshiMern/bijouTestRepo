import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner_ring from "../../assets/images/banner_ring.png";
import banner_earrings from "../../assets/images/banner-earring.png";
import banner_bangles from "../../assets/images/banner-bangles.png";
import banner_bracelets from "../../assets/images/banner-bracelete.png";
import hand_set from "../../assets/images/banner-hand-set.png";
import banner_pendent from "../../assets/images/banner-pendant.png";
import flower from "../../assets/images/flower.svg";
import hand_crafted_img1 from "../../assets/images/hand_crafted_img1.png";
import hand_crafted_img2 from "../../assets/images/hand_crafted_img2.png";
import hand_crafted_img3 from "../../assets/images/hand_crafted_img3.png";
import hand_crafted_img4 from "../../assets/images/hand_crafted_img4.png";
import hand_crafted_img5 from "../../assets/images/hand_crafted_img5.png";
import signature_img from "../../assets/images/signature_img.png";
import insta_img1 from "../../assets/images/insta_img1.png";
import insta_img2 from "../../assets/images/insta_img2.png";
import insta_img3 from "../../assets/images/insta_img3.png";
import insta_img4 from "../../assets/images/insta_img4.png";
import insta_img5 from "../../assets/images/insta_img5.png";
import insta_img6 from "../../assets/images/insta_img6.png";
import insta_img7 from "../../assets/images/insta_img7.png";
import insta_img8 from "../../assets/images/insta_img8.png";

const Home = () => {
  const [images, setImages] = useState([
    { src: banner_ring, title: "Rings" },
    { src: banner_bracelets, title: "Bracelets" },
    { src: banner_bangles, title: "Bangles" },
    { src: banner_earrings, title: "Earrings" },
    { src: hand_set, title: "Handsets" },
    { src: banner_pendent, title: "Pendants" },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const totalPoints = images.length;
  const angleStep = 360 / totalPoints;

  const updateSlider = () => {
    // setTimeout(() => {
    const points = document.querySelectorAll(".point");
    points.forEach((point) => point.classList.remove("active"));

    let activeIndex = currentIndex % totalPoints;
    points[activeIndex].classList.add("active");
    // }, 300);
  };

  const rotateCircle = (direction) => {
    setRotationAngle(rotationAngle + direction * angleStep);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex >= images.length) {
        newIndex = 0;
      }
      updateSlider();
      rotateCircle(-1);
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) {
        newIndex = images.length - 1;
      }
      updateSlider();
      rotateCircle(1);
      return newIndex;
    });
  };

  const positionPoints = () => {
    const points = document.querySelectorAll(".point");
    points.forEach((point, index) => {
      const angle = index * angleStep;
      const radius = 180;
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);
      point.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  useEffect(() => {
    positionPoints();
  }, []);

  return (
    <div className="section">
      <div className="banner-section">
        <div className="slider-container">
          <button className="arrow right" onClick={nextSlide}></button>
          <div className="images-wrap">
            <div className="image-container">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
              />
            </div>
          </div>
          <div className="circle">
            <div
              className="point-container"
              id="pointContainer"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`point ${index === currentIndex ? "active" : ""}`}
                  data-index={index}
                  style={{
                    top: `${
                      index === 0
                        ? "-1.4%"
                        : index === 1
                        ? "2%"
                        : index === 2
                        ? "52.5%"
                        : index === 3
                        ? "99%"
                        : index === 4
                        ? "96%"
                        : "44.7%"
                    }`,
                    left: `${
                      index === 0
                        ? "24%"
                        : index === 1
                        ? "80%"
                        : index === 2
                        ? " auto"
                        : index === 3
                        ? "73%"
                        : index === 4
                        ? "18.3%"
                        : "-6.5%"
                    }`,
                    right: `${
                      index === 0
                        ? "0%"
                        : index === 1
                        ? "0%"
                        : index === 2
                        ? " -7%"
                        : index === 3
                        ? " 0%"
                        : index === 4
                        ? "0%"
                        : "-0%"
                    }`,
                  }}
                >
                  <span className="title">{image.title}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="arrow left" onClick={prevSlide}></button>
        </div>
      </div>
      <div className="modern-section">
        <div className="container">
          <div className="wrap">
            <div className="left right">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flower">
                  <img src={flower} alt="flower" />
                </div>
              ))}
            </div>
            <div className="middle">
              <p>
                Modern, Playful, & endlessly approachable. Bijou Co. is where
                diamonds meet real life.
              </p>
            </div>
            <div className="right">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flower">
                  <img src={flower} alt="flower" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="hand-crafted-section">
        <div className="wrap">
          <div className="left">
            <div className="img-wrap">
              <div className="handcrafted">
                <img src={hand_crafted_img1} alt="hand-crafted-img1" />
              </div>
              <h2>HANDCRAFTED</h2>
            </div>
          </div>
          <div className="right">
            <div className="img-wrap">
              <div className="handcrafted">
                <img src={hand_crafted_img2} alt="hand-crafted-img2" />
              </div>
              <div className="handcrafted">
                <img src={hand_crafted_img3} alt="hand-crafted-img3" />
              </div>
              <div className="handcrafted">
                <img src={hand_crafted_img4} alt="hand-crafted-img4" />
              </div>
              <div className="handcrafted">
                <img src={hand_crafted_img5} alt="hand-crafted-img5" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="signature-section">
        <div className="container">
          <h2>Signature Pieces</h2>
          <div className="wrap">
            <div className="left">
              <div className="sig-img">
                <img src={signature_img} alt="Signature-img" />
              </div>
            </div>
            <div className="right">
              <div className="cont-wrap">
                <h3>T Wire Ring in Yellow Gold</h3>
                <p>
                  From the curve of the human body to brushstrokes translating
                  into fluid lines, the striking pieces make for unique
                  additions to any wardrobe.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Specifications:
                  <span> Metal | Carat weight | Cut</span>
                </p>
                <div className="btn-wrap">
                  <a href="#" className="common-btn">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="brilliance-section">
        <div className="container">
          <div className="wrap">
            <h2>Brilliance for the Bold, the Busy, & the Beautiful - You.</h2>
            <div className="btns-wrap">
              <div className="btn-wrap">
                <a href="#" className="common-btn">
                  Customize your look
                </a>
              </div>

              <div className="btn-wrap">
                <Link to="/bookAppointment" className="common-btn">Book an appointment</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="box-section">
          <div className="container">
            <div className="wrap">
              <div className="top-box">
                <div className="box">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.”{" "}
                </div>
                <div className="box">
                  “From the curve of the human body to brushstrokes translating
                  into fluid lines, the striking pieces make for unique
                  additions to any wardrobe.”
                </div>
                <div className="box">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”{" "}
                </div>
                <div className="box">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.”{" "}
                </div>
                <div className="box">
                  “From the curve of the human body to brushstrokes translating
                  into fluid lines, the striking pieces make for unique
                  additions to any wardrobe.”
                </div>
                <div className="box">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”{" "}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      <div className="instagram">
        <div className="container">
          <div className="wrap">
            <h2>
              If you’re going to do your most, you may as well sparkle while
              doing it!
            </h2>
            <div className="inst-img-wrap">
              <div className="inst-com">
                <img src={insta_img1} alt="insta-img1" />
              </div>
              <div className="inst-com">
                <img src={insta_img2} alt="insta-img2" />
              </div>
              <div className="inst-com">
                <img src={insta_img3} alt="insta-img3" />
              </div>
              <div className="inst-com">
                <img src={insta_img4} alt="insta-img4" />
              </div>
              <div className="inst-com">
                <img src={insta_img5} alt="insta-img5" />
              </div>
              <div className="inst-com">
                <img src={insta_img6} alt="insta-img6" />
              </div>
              <div className="inst-com">
                <img src={insta_img7} alt="insta-img7" />
              </div>
              <div className="inst-com">
                <img src={insta_img8} alt="insta-img8" />
              </div>
            </div>
            <div className="btn-wrap">
              <a href="https://www.instagram.com/surtiesnews/?hl=en" className="common-btn">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
