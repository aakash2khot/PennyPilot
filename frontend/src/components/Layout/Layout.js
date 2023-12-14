import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../../styles/HeaderStyles.css";
const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Header />
      <div id="mid" className="content container mt-4">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
