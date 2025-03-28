import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AccountSection = () => {
  const googleAuthLogin = () => {
    sessionStorage.setItem("loginMethod", "google");
    window.open(
      `${import.meta.env.VITE_APP_HOST}/api/v1/auth/google/callback?mode=login`,
      "_self"
    );
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    const field = id || name;
    setFormData({ ...formData, [field]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!validateForm()) {
        setSubmitting(false);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/api/v1/users/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );

      setFormData({
        email: "",
        password: ""
      });

      const token = response?.data?.token;
      if (token) {
        sessionStorage.setItem("Authorization", token);
      }

      toast.success(response?.data.message || "Login Successful!");
      console.log("Login successful:", response.data);
      window.location.href = `/`;
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
      setErrors({ server: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section">
      <div className="account-login">
        <div className="container">
          <div className="wrap">
            <div className="left">
              <h3>Sign In</h3>
              <p>Please sign into your account</p>
              <div className="social-login">
                <div className="google">
                  <button onClick={googleAuthLogin}>
                    Continue with Google
                  </button>
                  <svg
                    className="hidden md:flex w-xl h-xl"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M20.68 11.2291C20.68 10.5141 20.6158 9.82663 20.4967 9.16663H11V13.0716H16.4267C16.1883 14.3275 15.4733 15.3908 14.4008 16.1058V18.645H17.6733C19.58 16.885 20.68 14.3 20.68 11.2291Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M11.0002 21.0834C13.7227 21.0834 16.0052 20.185 17.6735 18.645L14.401 16.1059C13.5027 16.7109 12.3569 17.0775 11.0002 17.0775C8.37854 17.0775 6.15104 15.3084 5.35354 12.925H1.99854V15.5284C3.6577 18.8192 7.05853 21.0834 11.0002 21.0834Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.35317 12.9158C5.1515 12.3108 5.03234 11.6692 5.03234 11C5.03234 10.3308 5.1515 9.68917 5.35317 9.08417V6.48083H1.99817C1.31067 7.8375 0.916504 9.36834 0.916504 11C0.916504 12.6317 1.31067 14.1625 1.99817 15.5192L4.61067 13.4842L5.35317 12.9158Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M11.0002 4.93163C12.4852 4.93163 13.8052 5.44496 14.8594 6.43496L17.7469 3.54746C15.996 1.91579 13.7227 0.916626 11.0002 0.916626C7.05854 0.916626 3.6577 3.18079 1.99854 6.48079L5.35354 9.08413C6.15104 6.70079 8.37854 4.93163 11.0002 4.93163Z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
                <div className="facebook">
                  <button>Continue with Facebook</button>
                  <svg
                    className="hidden md:flex w-xl h-xl"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1353_85669)">
                      <path
                        d="M21.9336 11.0001C21.9336 5.06957 17.0385 0.261963 11.0002 0.261963C4.96191 0.261963 0.0668945 5.06957 0.0668945 11.0001C0.0668945 16.3597 4.06505 20.8021 9.2919 21.6077V14.104H6.51586V11.0001H9.2919V8.63433C9.2919 5.94308 10.9242 4.45654 13.4216 4.45654C14.6178 4.45654 15.869 4.66626 15.869 4.66626V7.30884H14.4903C13.1321 7.30884 12.7086 8.13658 12.7086 8.98577V11.0001H15.7409L15.2561 14.104H12.7086V21.6077C17.9354 20.8021 21.9336 16.3597 21.9336 11.0001Z"
                        fill="#1877F2"
                      />
                      <path
                        d="M15.2559 14.1039L15.7406 10.9999H12.7083V8.98564C12.7083 8.13646 13.1319 7.30872 14.4901 7.30872H15.8688V4.66614C15.8688 4.66614 14.6175 4.45642 13.4213 4.45642C10.9239 4.45642 9.29166 5.94297 9.29166 8.63421V10.9999H6.51562V14.1039H9.29166V21.6076C9.8568 21.6946 10.428 21.7382 11 21.738C11.5812 21.738 12.1517 21.6934 12.7083 21.6076V14.1039H15.2559Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1353_85669">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="login-or">
                <div className="line"></div>
                <div className="or">OR</div>
                <div className="line"></div>
              </div>
              <form className="sign-in-form" onSubmit={handleSubmit}>
                <div className="form-field full">
                  <input
                    type="email"
                    placeholder="Email*"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div className="form-field full">
                  <input
                    type="password"
                    placeholder="Password*"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                  <a href="#">Show</a>
                </div>
                {errors.server && (
                  <span className="error server-error">{errors.server}</span>
                )}
                <a href="#" className="forget-pass">
                  Forgot your password?
                </a>
                <button type="submit" disabled={submitting}>
                  {submitting ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
            <div className="right">
              <h3>Create an Account</h3>
              <p>
                Save time during checkout, view your shopping bag and booked
                appointments from any device and access your order history.
              </p>
              <button>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
