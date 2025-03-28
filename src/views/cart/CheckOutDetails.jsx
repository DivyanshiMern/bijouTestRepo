import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { guestLogin } from "../../store/apps/user/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { createOrder } from "../../store/apps/order/orderSlice";

const Checkout = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    emailId: "",
    shipping: {
      firstName: "",
      lastName: "",
      company: "",
      street: "",
      floor: "",
      city: "",
      country: "",
      postalCode: "",
      telephone: ""
    },
    billing: {
      firstName: "",
      lastName: "",
      company: "",
      street: "",
      floor: "",
      city: "",
      country: "",
      postalCode: "",
      telephone: ""
    },
    paymentMethod: "",
    panNumber: "",
    panName: "",
    declaration: false
  });
  console.log("==formData===", formData);

  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("orderFor");
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { token } = useSelector((state) => state.user); // Get token from Redux state

  const isTokenExist = sessionStorage.getItem("Authorization");
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
  const discount = 0;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee - discount;

  const handleInputChange = (e, section = null) => {
    const { name, value, type, checked } = e.target;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: type === "checkbox" ? checked : value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSameAsShipping = (e) => {
    const isChecked = e.target.checked;
    setSameAsShipping(isChecked);
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        billing: { ...prev.shipping }
      }));
    } else {
      // Reset billing details if unchecked
      setFormData((prev) => ({
        ...prev,
        billing: {
          firstName: "",
          lastName: "",
          company: "",
          street: "",
          floor: "",
          city: "",
          country: "",
          postalCode: "",
          telephone: ""
        }
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateGuestForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }

    if (!formData.emailId) {
      newErrors.emailId = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = "Email is invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validatePaymentForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate Shipping Details
    if (!formData.shipping.firstName) {
      newErrors.shippingFirstName = "First Name is required";
      valid = false;
    }
    if (!formData.shipping.lastName) {
      newErrors.shippingLastName = "Last Name is required";
      valid = false;
    }
    if (!formData.shipping.street) {
      newErrors.shippingStreet = "Street Address is required";
      valid = false;
    }
    if (!formData.shipping.city) {
      newErrors.shippingCity = "City is required";
      valid = false;
    }
    if (!formData.shipping.country) {
      newErrors.shippingCountry = "Country is required";
      valid = false;
    }
    if (!formData.shipping.postalCode) {
      newErrors.shippingPostalCode = "Postal Code is required";
      valid = false;
    }
    if (!formData.shipping.telephone) {
      newErrors.shippingTelephone = "Telephone is required";
      valid = false;
    }

    // Validate Billing Details
    if (!sameAsShipping) {
      if (!formData.billing.firstName) {
        newErrors.billingFirstName = "First Name is required";
        valid = false;
      }
      if (!formData.billing.lastName) {
        newErrors.billingLastName = "Last Name is required";
        valid = false;
      }
      if (!formData.billing.street) {
        newErrors.billingStreet = "Street Address is required";
        valid = false;
      }
      if (!formData.billing.city) {
        newErrors.billingCity = "City is required";
        valid = false;
      }
      if (!formData.billing.country) {
        newErrors.billingCountry = "Country is required";
        valid = false;
      }
      if (!formData.billing.postalCode) {
        newErrors.billingPostalCode = "Postal Code is required";
        valid = false;
      }
      if (!formData.billing.telephone) {
        newErrors.billingTelephone = "Telephone is required";
        valid = false;
      }
    }

    // Validate Payment Method
    // if (!formData.paymentMethod) {
    //   newErrors.paymentMethod = "Please select a payment method";
    //   valid = false;
    // }

    // Validate PAN if total is >= 2 lakh
    if (total >= 200000) {
      if (!formData.panNumber) {
        newErrors.panNumber =
          "PAN Number is required for orders worth Rs. 2 lakh or above";
        valid = false;
      }
      if (!formData.panName) {
        newErrors.panName = "Name (as on PAN) is required";
        valid = false;
      }
    }

    // Validate Declaration
    if (!formData.declaration) {
      newErrors.declaration = "You must accept the declaration";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/api/v1/users/login`,
        {
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );

      setFormData((prev) => ({
        ...prev,
        email: "",
        password: ""
      }));

      const token = response?.data?.token;
      if (token) {
        sessionStorage.setItem("Authorization", token);
      }

      toast.success(response?.data.message || "Login Successful!");
      console.log("Login successful:", response.data);
      setActiveSection("orderGoing");
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
      setErrors({ server: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!validateGuestForm()) {
      setSubmitting(false);
      return;
    }

    try {
      const guestData = {
        full_name: formData.fullName,
        email: formData.emailId
      };
      const guestResponse = await dispatch(guestLogin(guestData)).unwrap();

      const token = guestResponse?.token;
      if (token) {
        sessionStorage.setItem("Authorization", token);
      }

      setFormData((prev) => ({
        ...prev,
        fullName: "",
        emailId: ""
      }));

      toast.success("Guest login successful!");
      setActiveSection("orderGoing");
    } catch (error) {
      console.error("Guest Login failed:", error);
      const errorMessage = error.message || "Guest login failed!";
      toast.error(errorMessage);
      setErrors({ guestServer: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!cartItems || cartItems.length === 0) {
      toast.error(
        "Please select at least one product to proceed with your order!"
      );
      setSubmitting(false);
      return;
    }

    if (!validatePaymentForm()) {
      setSubmitting(false);
      return;
    }

    const orderData = new FormData();
    orderData.append(
      "shippingDetails",
      JSON.stringify({
        firstName: formData.shipping.firstName,
        lastName: formData.shipping.lastName,
        company: formData.shipping.company || null,
        street: formData.shipping.street,
        floor: formData.shipping.floor || null,
        city: formData.shipping.city,
        country: formData.shipping.country,
        postalCode: formData.shipping.postalCode,
        telephone: formData.shipping.telephone
      })
    );
    orderData.append(
      "billingDetails",
      JSON.stringify({
        firstName: formData.billing.firstName,
        lastName: formData.billing.lastName,
        company: formData.billing.company || null,
        street: formData.billing.street,
        floor: formData.billing.floor || null,
        city: formData.billing.city,
        country: formData.billing.country,
        postalCode: formData.billing.postalCode,
        telephone: formData.billing.telephone
      })
    );
    orderData.append(
      "orderDetails",
      JSON.stringify(
        cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.total,
          name: item.name,
          size: item?.size,
          color: item.color,
          metal: item.metal,
          productImage: item.image,
          variantId: item.variantId
        }))
      )
    );
    orderData.append("paymentMethod", formData.paymentMethod);
    if (total >= 200000) {
      console.log("==panFile==", formData.panFile);

      orderData.append("panNumber", formData.panNumber);
      orderData.append("panName", formData.panName);
      if (formData.panFile) {
        orderData.append("pan_image", formData.panFile);
      }
    }
    orderData.append("totalAmount", total);

    try {
      const response = await dispatch(createOrder(orderData)).unwrap();

      toast.success(response?.data.message || "Order created successfully!");
      console.log("Order created:", response.data);

      setCartItems([]);
      sessionStorage.removeItem("shoppingBag");
      navigate("/myAccount");
    } catch (error) {
      console.error("Order creation failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create order. Please try again!";
      toast.error(errorMessage);
      setErrors({ paymentServer: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="section">
      <div className="checkout">
        <div className="container">
          <div className="continue-wrap">
            <Link to="/addToCart" className="continue">
              BACK
            </Link>
          </div>
          <div className="wrap">
            
            <div className="left">
              <h2>Checkout</h2>
              <ul className="accordion">
                {/* Section 1: Who is this order for? */}
                <li className="accordion-item">
                  <div
                    className="accordion-header"
                    onClick={() => toggleSection("orderFor")}
                  >
                    <p>1. Who is this order for?</p>
                    <span
                      className={`chevron ${
                        activeSection === "orderFor" ? "open" : ""
                      }`}
                    >
                      
                    </span>
                  </div>
                  {activeSection === "orderFor" && (
                    <div className="accordion-content">
                      <div className="form-wrap">
                        <form className="checkout-form" onSubmit={handleSubmit}>
                          <div className="form-field full">
                            <input
                              type="email"
                              placeholder="Email*"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={submitting}
                            />
                            {errors.email && (
                              <span className="error">{errors.email}</span>
                            )}
                          </div>
                          <div className="form-field full">
                            <input
                              type="password"
                              placeholder="Password*"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              disabled={submitting}
                            />
                            <Link to="#">Show</Link>
                            {errors.password && (
                              <span className="error">{errors.password}</span>
                            )}
                          </div>
                          <Link to="#" className="forget-pass">
                            Forgot your password?
                          </Link>
                          <button type="submit" disabled={submitting}>
                            {submitting ? "Signing In..." : "Sign In"}
                          </button>
                          {errors.server && (
                            <span className="error">{errors.server}</span>
                          )}
                        </form>
                        <div className="checkout-or">
                          <div className="line"></div>
                          <div className="or">OR</div>
                          <div className="line"></div>
                        </div>
                        <form
                          className="checkout-form"
                          onSubmit={handleGuestLogin}
                        >
                          <div className="form-field full">
                            <input
                              type="text"
                              placeholder="Full Name"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              disabled={submitting}
                            />
                            {errors.fullName && (
                              <span className="error">{errors.fullName}</span>
                            )}
                          </div>
                          <div className="form-field full">
                            <input
                              type="email"
                              placeholder="Email Id*"
                              name="emailId"
                              value={formData.emailId}
                              onChange={handleInputChange}
                              disabled={submitting}
                            />
                            {errors.emailId && (
                              <span className="error">{errors.emailId}</span>
                            )}
                          </div>
                          <button type="submit" disabled={submitting}>
                            {submitting ? "Processing..." : "Continue as Guest"}
                          </button>
                          {errors.guestServer && (
                            <span className="error">{errors.guestServer}</span>
                          )}
                        </form>
                      </div>
                    </div>
                  )}
                </li>

                {/* Section 2: Where’s this order going? */}
                {isTokenExist && (
                  <li className="accordion-item">
                    <div
                      className="accordion-header"
                      onClick={() => toggleSection("orderGoing")}
                    >
                      <p>2. Where’s this order going?</p>
                      <span
                        className={`chevron ${
                          activeSection === "orderGoing" ? "open" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                    {activeSection === "orderGoing" && (
                      <div className="accordion-content">
                        <div className="form-wrap">
                          <form className="checkout-form shipping-detail">
                            <h4>Shipping Details</h4>
                            <div className="full">
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="First Name*"
                                  name="firstName"
                                  value={formData.shipping.firstName}
                                  onChange={(e) =>
                                    handleInputChange(e, "shipping")
                                  }
                                />
                                {errors.shippingFirstName && (
                                  <span className="error">
                                    {errors.shippingFirstName}
                                  </span>
                                )}
                              </div>
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Last Name*"
                                  name="lastName"
                                  value={formData.shipping.lastName}
                                  onChange={(e) =>
                                    handleInputChange(e, "shipping")
                                  }
                                />
                                {errors.shippingLastName && (
                                  <span className="error">
                                    {errors.shippingLastName}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="form-field">
                              <input
                                type="text"
                                placeholder="Company (Optional)"
                                name="company"
                                value={formData.shipping.company}
                                onChange={(e) =>
                                  handleInputChange(e, "shipping")
                                }
                              />
                            </div>
                            <div className="full street">
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Street Address*"
                                  name="street"
                                  value={formData.shipping.street}
                                  onChange={(e) =>
                                    handleInputChange(e, "shipping")
                                  }
                                />
                                {errors.shippingStreet && (
                                  <span className="error">
                                    {errors.shippingStreet}
                                  </span>
                                )}
                              </div>
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Floor, Suite, Etc. (Optional)"
                                  name="floor"
                                  value={formData.shipping.floor}
                                  onChange={(e) =>
                                    handleInputChange(e, "shipping")
                                  }
                                />
                              </div>
                            </div>
                            <div className="form-field">
                              <input
                                type="text"
                                placeholder="City*"
                                name="city"
                                value={formData.shipping.city}
                                onChange={(e) =>
                                  handleInputChange(e, "shipping")
                                }
                              />
                              {errors.shippingCity && (
                                <span className="error">
                                  {errors.shippingCity}
                                </span>
                              )}
                            </div>
                            <div className="form-field">
                              <input
                                type="text"
                                placeholder="Country*"
                                name="country"
                                value={formData.shipping.country}
                                onChange={(e) =>
                                  handleInputChange(e, "shipping")
                                }
                              />
                              {errors.shippingCountry && (
                                <span className="error">
                                  {errors.shippingCountry}
                                </span>
                              )}
                            </div>
                            <div className="full">
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Postal Code*"
                                  name="postalCode"
                                  value={formData.shipping.postalCode}
                                  onChange={(e) =>
                                    handleInputChange(e, "shipping")
                                  }
                                />
                                {errors.shippingPostalCode && (
                                  <span className="error">
                                    {errors.shippingPostalCode}
                                  </span>
                                )}
                              </div>
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Telephone*"
                                  name="telephone"
                                  value={formData.shipping.telephone}
                                  onChange={(e) =>
                                    handleInputChange(e, "shipping")
                                  }
                                />
                                {errors.shippingTelephone && (
                                  <span className="error">
                                    {errors.shippingTelephone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </form>
                          <form className="checkout-form shipping-detail">
                            <h4>Billing Details</h4>
                            <div className="checkbox-wrapper">
                              <input
                                id="input-checkbox"
                                className="input-checkbox"
                                type="checkbox"
                                checked={sameAsShipping}
                                onChange={handleSameAsShipping}
                              />
                              <label
                                htmlFor="input-checkbox"
                                className="checkbox-label"
                              >
                                Same as Shipping Details
                              </label>
                            </div>
                            <div className="full">
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="First Name*"
                                  name="firstName"
                                  value={formData.billing.firstName}
                                  onChange={(e) =>
                                    handleInputChange(e, "billing")
                                  }
                                  disabled={sameAsShipping}
                                />
                                {errors.billingFirstName && (
                                  <span className="error">
                                    {errors.billingFirstName}
                                  </span>
                                )}
                              </div>
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Last Name*"
                                  name="lastName"
                                  value={formData.billing.lastName}
                                  onChange={(e) =>
                                    handleInputChange(e, "billing")
                                  }
                                  disabled={sameAsShipping}
                                />
                                {errors.billingLastName && (
                                  <span className="error">
                                    {errors.billingLastName}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="form-field">
                              <input
                                type="text"
                                placeholder="Company (Optional)"
                                name="company"
                                value={formData.billing.company}
                                onChange={(e) =>
                                  handleInputChange(e, "billing")
                                }
                                disabled={sameAsShipping}
                              />
                            </div>
                            <div className="full street">
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Street Address*"
                                  name="street"
                                  value={formData.billing.street}
                                  onChange={(e) =>
                                    handleInputChange(e, "billing")
                                  }
                                  disabled={sameAsShipping}
                                />
                                {errors.billingStreet && (
                                  <span className="error">
                                    {errors.billingStreet}
                                  </span>
                                )}
                              </div>
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Floor, Suite, Etc. (Optional)"
                                  name="floor"
                                  value={formData.billing.floor}
                                  onChange={(e) =>
                                    handleInputChange(e, "billing")
                                  }
                                  disabled={sameAsShipping}
                                />
                              </div>
                            </div>
                            <div className="form-field">
                              <input
                                type="text"
                                placeholder="City*"
                                name="city"
                                value={formData.billing.city}
                                onChange={(e) =>
                                  handleInputChange(e, "billing")
                                }
                                disabled={sameAsShipping}
                              />
                              {errors.billingCity && (
                                <span className="error">
                                  {errors.billingCity}
                                </span>
                              )}
                            </div>
                            <div className="form-field">
                              <input
                                type="text"
                                placeholder="Country*"
                                name="country"
                                value={formData.billing.country}
                                onChange={(e) =>
                                  handleInputChange(e, "billing")
                                }
                                disabled={sameAsShipping}
                              />
                              {errors.billingCountry && (
                                <span className="error">
                                  {errors.billingCountry}
                                </span>
                              )}
                            </div>
                            <div className="full">
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Postal Code*"
                                  name="postalCode"
                                  value={formData.billing.postalCode}
                                  onChange={(e) =>
                                    handleInputChange(e, "billing")
                                  }
                                  disabled={sameAsShipping}
                                />
                                {errors.billingPostalCode && (
                                  <span className="error">
                                    {errors.billingPostalCode}
                                  </span>
                                )}
                              </div>
                              <div className="form-field half">
                                <input
                                  type="text"
                                  placeholder="Telephone*"
                                  name="telephone"
                                  value={formData.billing.telephone}
                                  onChange={(e) =>
                                    handleInputChange(e, "billing")
                                  }
                                  disabled={sameAsShipping}
                                />
                                {errors.billingTelephone && (
                                  <span className="error">
                                    {errors.billingTelephone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </li>
                )}
                {/* Section 3: What’s your payment method? */}
                {isTokenExist && total >= 200000 && (
                  <li className="accordion-item">
                    <div
                      className="accordion-header"
                      onClick={() => toggleSection("paymentMethod")}
                    >
                      <p>3. What’s your Pan method?</p>
                      <span
                        className={`chevron ${
                          activeSection === "paymentMethod" ? "open" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                    {activeSection === "paymentMethod" && (
                      <div className="accordion-content">
                        <div className="form-wrap">
                          <div className="pan-container">
                            {total >= 200000 && (
                              <>
                                <h4>PAN Verification</h4>
                                <span className="pan-info">
                                  As per Government of India rules, PAN is
                                  mandatory for all orders worth Rs. 2 lakh or
                                  above.
                                </span>
                                <div className="full">
                                  <div className="form-field half">
                                    <input
                                      type="text"
                                      id="pan-number"
                                      name="panNumber"
                                      placeholder="PAN Number"
                                      value={formData.panNumber}
                                      onChange={handleInputChange}
                                      aria-label="PAN Number"
                                    />
                                    {errors.panNumber && (
                                      <span className="error">
                                        {errors.panNumber}
                                      </span>
                                    )}
                                  </div>
                                  <div className="form-field half">
                                    <input
                                      type="text"
                                      id="pan-name"
                                      name="panName"
                                      placeholder="Name (as on PAN)"
                                      value={formData.panName}
                                      onChange={handleInputChange}
                                      aria-label="Name as on PAN"
                                    />
                                    {errors.panName && (
                                      <span className="error">
                                        {errors.panName}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="form-field custom-file-input">
                                  <label htmlFor="upload-pan">Upload PAN</label>
                                  <label
                                    htmlFor="upload-pan"
                                    className="custom-file-label"
                                  >
                                    {formData.panFile
                                      ? formData.panFile.name
                                      : "Choose File"}
                                  </label>
                                  <input
                                    type="file"
                                    id="upload-pan"
                                    name="upload-pan"
                                    onChange={(e) =>
                                      handleInputChange(e, "panFile")
                                    }
                                    hidden
                                    accept=".pdf,.jpg,.jpeg,.png"
                                  />
                                  {errors.panFile && (
                                    <span className="error">
                                      {errors.panFile}
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                )}
              </ul>
              <form
                className="checkout-form pan-form"
                onSubmit={handleProceedToPayment}
              >
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="declaration"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="declaration" className="checkbox-label">
                    I have read and understood the{" "}
                    <Link to="#">declaration</Link> and accept the same.
                  </label>
                </div>
                {errors.declaration && (
                  <span className="error">{errors.declaration}</span>
                )}
                <button
                  type="submit"
                  className="pay-button"
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Proceed to Payment"}
                </button>
                {errors.paymentServer && (
                  <span className="error">{errors.paymentServer}</span>
                )}
              </form>
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

      <style jsx>{`
        .accordion {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .accordion-item {
          border-bottom: 1px solid #4a2c2a;
        }

        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          cursor: pointer;
          font-family: "Oswald", sans-serif;
          font-size: 16px;
          color: #000;
        }

        .accordion-header p {
          margin: 0;
        }

        .chevron {
          transition: transform 0.3s ease;
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          padding: 0 0 20px 0;
        }

        .checkout h2 {
          font-family: "Oswald", sans-serif;
          font-size: 24px;
          color: #000;
          margin-bottom: 20px;
          border-bottom: 1px solid #4a2c2a;
          padding-bottom: 10px;
        }

        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
