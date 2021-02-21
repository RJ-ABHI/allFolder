import React, { Component } from "react";
class cart extends Component {
  state = {
    cart: this.props.Cart,
  };
  render() {
    let { Cart } = this.props;
    console.log(Cart);
    let ingredients = [];
    
    return (
      <div className="mt-1">
        {Cart.length === 0 ? (
          <h6 className="text-center">There is no any product in cart</h6>
        ) : (
          <div className="">
            <h4 className="text-center">Products in Shopping Cart</h4>
            {Cart.map((p) => (
              <div
                // style={{ alignItems: "center" }}
                className="bg-light row col-10 mx-auto"
              >
                <div className="col col-4">
                  <img src={p.img} alt="" width="70" height="70" />
                </div>
                <div className="col col-4 font-weight-bold">{p.title}</div>
                <div className="col col-2">
                  <button className="btn btn-danger">-</button>
                  <button className="btn btn-secondary">1</button>
                  <button className="btn btn-success">+</button>
                </div>
              </div>
            ))}
            <div className="container col-6">
              <div className="text-center font-weight-bold">
                List of items in Cart
              </div>
              <div className="row col-12 bg-dark text-white  mx-auto text-center">
                <div className="col col-6">Item Name</div>
                <div className="col col-6">Count</div>
              </div>

              <div className="row col-12 bg-light mx-auto text-center"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default cart;
