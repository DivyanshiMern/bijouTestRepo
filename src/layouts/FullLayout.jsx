import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FullLayout() {
  return (
    <>
      <Header />
      <>
        <Box>
          <Outlet />
        </Box>
      </>
      <Footer />
    </>
  );
}
