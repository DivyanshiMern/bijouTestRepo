import React, { lazy } from "react";
import Loadable from "../layouts/Loadable/Loadable.jsx";
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout")));
const HomePage = Loadable(lazy(() => import("../views/homepage/homepage")));
const CategoryCollection = Loadable(
  lazy(() =>
    import("../views/collections/EarringsCollection/CategoryCollection.jsx")
  )
);
const SubCategoryCollection = Loadable(
  lazy(() =>
    import("../views/collections/EarringsCollection/SubcategoryCollection.jsx")
  )
);
const ProductDetails = Loadable(
  lazy(() => import("../views/productDetails/ProductDetails.jsx"))
);
const ContactDetails = Loadable(
  lazy(() => import("../views/contact/ContactDetails.jsx"))
);
const AddToCartDetails = Loadable(
  lazy(() => import("../views/cart/AddToCartDetails.jsx"))
);
const CheckoutDetails = Loadable(
  lazy(() => import("../views/cart/CheckOutDetails.jsx"))
);
const MyAccountDetails = Loadable(
  lazy(() => import("../views/myAccount/myAccount.jsx"))
);

const ProductList = Loadable(
  lazy(() => import("../views/productList/ProductList.jsx"))
);
const BookAnAppointment = Loadable(
  lazy(() => import("../components/BookAppointment.jsx"))
);

const RefundPolicy = Loadable(
  lazy(() => import("../views/policies/RefundPolicy.jsx"))
);
const PrivacyPolicy = Loadable(
  lazy(() => import("../views/policies/PrivacyPolicy.jsx"))
);
const ReturnPolicy = Loadable(
  lazy(() => import("../views/policies/ReturnPolicy.jsx"))
);
const ShippingPolicy = Loadable(
  lazy(() => import("../views/policies/ShippingPolicy.jsx"))
);
const TermsAndConditions = Loadable(
  lazy(() => import("../views/policies/TermsAndConditions.jsx"))
);
const router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/category/:categoryName/:categoryId",
        element: <CategoryCollection />,
      },
      {
        path: "/category/:categoryName/:categoryId/subcategory/:subCategoryName/:subCategoryId",
        element: <SubCategoryCollection />,
      },
      {
        path: "/category/:categoryName/:categoryId/productDetail/:uniqueProductId",
        element: <ProductDetails />,
      },
      {
        path: "/contact",
        element: <ContactDetails />,
      },
      {
        path: "/addToCart",
        element: <AddToCartDetails />,
      },
      {
        path: "/checkout",
        element: <CheckoutDetails />,
      },
      {
        path: "/myAccount",
        element: <MyAccountDetails />,
      },
      {
        path: "/productList",
        element: <ProductList />,
      },
      // {
      //   path: "/bookAppointment",
      //   element: <BookAnAppointment />,
      // },
      {
        path: "/refundPolicy",
        element: <RefundPolicy />,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/shippingPolicy",
        element: <ShippingPolicy />,
      },
      {
        path: "/returnPolicy",
        element: <ReturnPolicy />,
      },
      {
        path: "/termsAndConditions",
        element: <TermsAndConditions />,
      },
    ],
  },
];

export default router;
