import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";
import Products from "./products";
import LoginPage from "./loginPage";
import Cart from "./cart";
import EditProduct from "./EditProduct";
class Main extends Component {
  state = {
    loginDetails: {},
    cartArray: [],
  };
  handleloginDetails = (data) => {
    this.setState({ loginDetails: data });
  };
  handleCart = (cart) => {
    this.setState({ cartArray: cart });
  };
  render() {
    return (
      <div>
        <Navbar loginData={this.state.loginDetails} />
        <Route
          path="/product/:category/:id/edit"
          exact
          render={(props) => (
            <EditProduct {...props} key={Math.floor(Math.random() * 10)} />
          )}
        />
        <Route
          path="/product/:category?/:id?"
          exact
          render={(props) => (
            <Products
              {...props}
              key={Math.floor(Math.random() * 10)}
              onCart={this.handleCart}
              loginData={this.state.loginDetails}
              cart={this.state.cartArray}
            />
          )}
        />
        <Route
          path="/login"
          exact
          render={(props) => (
            <LoginPage
              {...props}
              key={Math.floor(Math.random() * 10)}
              onLoginDetails={this.handleloginDetails}
            />
          )}
        />
        <Route
          path="/cart"
          exact
          render={(props) => (
            <Cart
              {...props}
              key={Math.floor(Math.random() * 10)}
              onLoginDetails={this.handleloginDetails}
              Cart={this.state.cartArray}
            />
          )}
        />
      </div>
    );
  }
}

export default Main;
