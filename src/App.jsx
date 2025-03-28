import React, { Suspense, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Box } from "@mui/material";
import { getCategoryList } from "./store/apps/category/categorySlice";
import { fetchUser } from "./store/apps/user/userSlice";
import router from "./routes/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  console.log("Redux State:", state);

  const categoryState = useSelector((state) => state.category || {});
  const userState = useSelector((state) => state.user || {});

  const { categories, loading: categoryLoading, error: categoryError } = categoryState;
  const { user, status: userStatus, error: userError } = userState;

  useEffect(() => {
    if (!categories?.length && !categoryLoading && !categoryError) {
      dispatch(getCategoryList());
    }
  }, [dispatch, categories, categoryLoading, categoryError]);

  useEffect(() => {
    const loginMethod = sessionStorage.getItem('loginMethod');
    
    if (loginMethod === 'google' && !user && userStatus !== 'loading' && !userError) {
      dispatch(fetchUser()).then((result) => {
        
        if (result) {
          sessionStorage.removeItem('loginMethod');
        }
      });
    }
  }, [dispatch, user, userStatus, userError]);

  const routing = useRoutes(router);

  if (categoryLoading || userStatus === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (categoryError || userError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <p>Error: {categoryError || userError?.message}</p>
      </Box>
    );
  }

  return <>{routing}</>;
}

export default function AppWithSuspense() {
  return (
    
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        </div>
      }
    >
      <App />
      <ToastContainer />
    </Suspense>
  );
}