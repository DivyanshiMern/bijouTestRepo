import { React} from "react";
import { Link } from "react-router-dom";
import RecommendedCollections from "../RecommendedCollections";
import FilterComponent from "../../FilterComponent/FilterComponent";
import braceletImg from "../../../assets/images/braceete-img.jpg";
import bracelete1 from "../../../assets/images/bracelete1.jpg";
import bracelete2 from "../../../assets/images/bracelete2.jpg";
import bracelete3 from "../../../assets/images/bracelete3.jpg";
import bracelete4 from "../../../assets/images/bracelete4.jpg";
import earringImg from "../../../assets/images/earing_img.jpg";
import cartWhiteIcon from '../../../assets/images/cart-white.svg'
const BraceletCollection = () => {

  return (
    <div className="section">
      <div className="bracelet-cat-sec-top">
        <div className="container">
          <div className="wrap">
            <h1>Bracelets </h1>
            <ul>
              <li>
                <div className="img-wrap">
                  <img src={braceletImg} />
                </div>
                <div className="content">
                  <p>Chain</p>
                </div>
              </li>
              <li>
                <div className="img-wrap">
                  <img src={braceletImg} />
                </div>
                <div className="content">
                  <p>Bangle</p>
                </div>
              </li>
              <li>
                <div className="img-wrap">
                  <img src={braceletImg} />
                </div>
                <div className="content">
                  <p>Cuff</p>
                </div>
              </li>
              <li>
                <div className="img-wrap">
                  <img src={braceletImg} />
                </div>
                <div className="content">
                  <p>Stacking</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bracelet-cat-sec-bottom">
        <div className="container">
          <div className="wrap">
            <ul className="breadcrumb">
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li className="active">Bracelets</li>
            </ul>
            <FilterComponent/>
            <div className="product-listing">
              <ul>
                <li>
                  <a href="#">
                    <img src={bracelete1} alt="bracelete1" />
                    <div className="product-btn-wrap">
                      <button className="product-btn">New</button>
                    </div>
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete2} alt="bracelete2" />  
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete3} alt="bracelete3" />
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete4} alt="bracelete4" />

                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete1} alt="bracelete1" />
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete2} alt="bracelete2" />                   
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete3} alt="bracelete3" />                  
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete4} alt="bracelete4" />
                   
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete1} alt="bracelete1" />
                    <div className="product-btn-wrap">
                      <button className="product-tile">
                        <img className="white" src={cartWhiteIcon} />
                        <span>Shop the Look</span>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete2} alt="bracelete2" />                   
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete3} alt="bracelete3" />                   
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete4} alt="bracelete4" />                   
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete1} alt="bracelete1" />                  
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete2} alt="bracelete2" />
                   
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete3} alt="bracelete3" />
                   
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete4} alt="bracelete4" />
                   
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={bracelete2} alt="bracelete2" />
                   
                    <div className="product-details">
                      <p className="product-detail-name">Tiffany Lock</p>
                      <button className="add-to-bag">
                        <div className="prize">₹ 50,000</div>
                        <div className="add-to-cart">Add to Bag</div>
                      </button>
                    </div>
                  </a>
                </li>
              </ul>
              <p className="pagination">Showing 1-16 of 20</p>
              <div className="view-more">
                <button>View More</button>
              </div>
              <div className="back-to-return">
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
      <RecommendedCollections imgURL={earringImg} altTextPrefix={"Earring"}/>
    </div>
  );
};

export default BraceletCollection;
