import React from "react";
import { Link } from "gatsby";
import Logo from "../logo.inline.svg";
const Layout = ({ location, children }) => {
  return (
    <>
      <header className="header">
        <div>
          <Link to="/" alt="MichaelCook.tech" className="logo">
            {/* <img src={Logo} title="MichaelCook.tech" className="logo" /> */}
            <Logo />
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer>© MichaelCook.tech {new Date().getFullYear()}</footer>
    </>
  );
};
export default Layout;
