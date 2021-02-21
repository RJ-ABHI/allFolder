import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    let { loginData } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="navbar-brand">Furniture Store</div>
          {loginData.role === undefined ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active mr-auto">
                <Link className="nav-link" to="/product">
                  Products
                </Link>
              </li>
            </ul>
          ) : loginData.role === "customer" ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active mr-auto">
                <Link className="nav-link" to="/product">
                  Products
                </Link>
              </li>
              <li className="nav-item active mr-auto">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active mr-auto">
                <Link className="nav-link" to="/product">
                  Products
                </Link>
              </li>
              <li className="nav-item active mr-auto">
                <Link className="nav-link" to="/cart">
                  Add a New Product
                </Link>
              </li>
            </ul>
          )}
          {loginData.role === undefined ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active ">
                <Link className="nav-link" to="/login">
                  Sign in
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active ">
                <Link className="nav-link" to="/">
                  Sign out
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    );
  }
}

export default Navbar;
