import React, { Component } from "react";
class LeftPanel extends Component {
  state = {
    product: this.props.productArray,
  };
  handleChange = (e) => {
    let { currentTarget: inp } = e;
    let { productArray } = this.props;
    // console.log(productArray);
    // console.log(e);
    // console.log(inp.value);
    // {productArray!==undefined?
    // console.log(inp);
    productArray[inp.name] = inp.value;
    // console.log(productArray);
    this.props.onLeftPanel(productArray);
  };
  render() {
    let { productArray: product } = this.props;
    // console.log(product);
    // console.log(this.state.product);
    return (
      <div className="container">
        <form action="">
          <div className="bg-light border p-2">Options</div>

          {product.product.map((p, ind) => (
            <div className="form-check border" key={ind}>
              <input
                type="radio"
                name="selected"
                id={p}
                value={p}
                className="form-check-input p-1 ml-2"
                checked={p === product.selected}
                onChange={this.handleChange}
              />
              <label htmlFor={p} className="form-check-label p-1 ml-4">
                {p}
              </label>
            </div>
          ))}
        </form>
      </div>
    );
  }
}

export default LeftPanel;
