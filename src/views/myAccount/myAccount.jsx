import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/custom.css";
import "../../assets/css/responsive.css";
import { getAllOrders } from "../../store/apps/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/apps/user/profileSlice";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    phone: "",
    birth: "",
    workAddress: "",
    homeAddress: "",
    communicationPrefs: "",
    languageCurrencyPrefs: "",
  });

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { userDetail, isLoading, error } = useSelector((state) => state.profile); // Destructure userDetail

  const isTokenExist = sessionStorage.getItem("Authorization");

  useEffect(() => {
    if (isTokenExist) {
      dispatch(getAllOrders());
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isTokenExist]);

  useEffect(() => {
    if (userDetail && Object.keys(userDetail).length > 0) {
      setFormData((prev) => ({
        ...prev,
        fname: userDetail.fullName || "",
        email: userDetail.email || "",
        phone: userDetail.contactNumber || "",
        birth: userDetail.DOB || "",
      }));
    }
  }, [userDetail]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    console.log("Personal Information Updated:", {
      fname: formData.fname,
      email: formData.email,
      phone: formData.phone,
      birth: formData.birth,
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    console.log("Address Book Updated:", {
      workAddress: formData.workAddress,
      homeAddress: formData.homeAddress,
    });
  };

  const handleAccountSettingsSubmit = (e) => {
    e.preventDefault();
    console.log("Account Settings Updated:", {
      communicationPrefs: formData.communicationPrefs,
      languageCurrencyPrefs: formData.languageCurrencyPrefs,
    });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    console.log("User logged out");
  };

  return (
    <div className="product-page">
      <div className="section">
        <div className="my-account">
          <div className="container">
            <div className="wrap">
              <h1>My Account</h1>
              <div className="content-wrap">
                <div className="tabs">
                  <Link
                    to="#"
                    className={`tab-qus ${activeTab === "profile" ? "active" : ""}`}
                    data-toggle="#profile"
                    onClick={() => handleTabClick("profile")}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="#"
                    className={`tab-qus ${activeTab === "orders" ? "active" : ""}`}
                    data-toggle="#orders"
                    onClick={() => handleTabClick("orders")}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="#"
                    className={`tab-qus ${activeTab === "privacy" ? "active" : ""}`}
                    data-toggle="#privacy"
                    onClick={() => handleTabClick("privacy")}
                  >
                    Account Settings
                  </Link>
                  <Link
                    to="#"
                    className={`tab-qus ${activeTab === "terms" ? "active" : ""}`}
                    data-toggle="#terms"
                    onClick={() => handleTabClick("terms")}
                  >
                    Log out
                  </Link>
                </div>
                <div className="tabs-content">
                  {/* My Profile Tab */}
                  {activeTab === "profile" && (
                    <div className="content" id="profile">
                      {isLoading && <div>Loading profile...</div>}
                      {error && <div>Error: {error.message}</div>}
                      {!isLoading && !error && (
                        <form className="orders-form" onSubmit={handlePersonalInfoSubmit}>
                          <h2>Personal Information</h2>
                          <div className="form-field full">
                            <label>Full Name:</label>
                            <input
                              type="text"
                              placeholder="Full Name"
                              name="fname"
                              value={formData.fname}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-field full">
                            <label>Email Address:</label>
                            <input
                              type="email"
                              placeholder="Email Address"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-field full">
                            <label>Phone Number:</label>
                            <input
                              type="text"
                              placeholder="Phone Number"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-field full">
                            <label>Date of Birth:</label>
                            <input
                              type="text"
                              placeholder="Date of Birth"
                              name="birth"
                              value={formData.birth}
                              onChange={handleInputChange}
                            />
                          </div>
                          <button type="submit" className="edit">
                            Edit
                          </button>
                        </form>
                      )}
                      <form className="orders-form adresss-book" onSubmit={handleAddressSubmit}>
                        <h2>Address Book</h2>
                        <div className="form-field full">
                          <label>Work</label>
                          <input
                            type="text"
                            placeholder="Work"
                            name="workAddress"
                            value={formData.workAddress}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-field full">
                          <label>Home</label>
                          <input
                            type="text"
                            placeholder="Home"
                            name="homeAddress"
                            value={formData.homeAddress}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button type="submit" className="edit">
                          Add new address
                        </button>
                      </form>
                    </div>
                  )}

                  {/* My Orders Tab */}
                  {activeTab === "orders" && (
                    <div className="content" id="orders">
                      <h2>Order List</h2>
                      {orders.map((order) => (
                        <div className="order-content" key={order.id}>
                          <div className="orders-info">
                            <p className="order-id">
                              Order ID: <span>{order.orderId} ({order.orderDetails.length} items)</span>
                            </p>
                            <p>{order.status === "pending" ? "In Delivery" : order.status}</p>
                          </div>
                          {order.orderDetails.map((item, index) => (
                            <div className="cart-content" key={index}>
                              <div className="cart-left">
                                <div className="img-wrap">
                                  <img src={item.productImage} alt={item.name} />
                                </div>
                              </div>
                              <div className="cart-right">
                                <div className="product-name">
                                  <div className="name">{item.name}</div>
                                  <div className="prize">₹ {item.price.toLocaleString("en-IN")}</div>
                                </div>
                                <div className="product-detail">
                                  <div className="color">
                                    <p>Color:</p>
                                    <p className="color-name">{item.color}</p>
                                  </div>
                                  <div className="metal">
                                    <p>Metal:</p>
                                    <p className="metal-name">{item.metal}</p>
                                  </div>
                                  <div className="size">
                                    <p>Size:</p>
                                    <p className="size-name">{item.size}</p>
                                  </div>
                                  <div className="quantity">
                                    <p>Quantity:</p>
                                    <div className="number-wrap">
                                      <span className="product-qty number">{item.quantity}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Account Settings Tab */}
                  {activeTab === "privacy" && (
                    <div className="content" id="privacy">
                      <form className="account-setting-form" onSubmit={handleAccountSettingsSubmit}>
                        <h2>Account Settings</h2>
                        <div className="form-field full">
                          <label>Communication Preferences</label>
                          <input
                            type="text"
                            placeholder="Communication Preferences"
                            name="communicationPrefs"
                            value={formData.communicationPrefs}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-field full">
                          <label>Language & Currency Preferences</label>
                          <input
                            type="email"
                            placeholder="Language & Currency Preferences"
                            name="languageCurrencyPrefs"
                            value={formData.languageCurrencyPrefs}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button type="submit" className="edit">
                          Change Password
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Log out Tab */}
                  {activeTab === "terms" && (
                    <div className="content" id="terms">
                      <h2>Log Out</h2>
                      <p>Are you sure you want to log out?</p>
                      <button className="edit" onClick={handleLogout}>
                        Confirm Log Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;