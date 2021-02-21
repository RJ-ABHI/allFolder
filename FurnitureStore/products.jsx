import React, { Component } from "react";
import axios from "axios";
import LeftPanel from "./LeftPanel";
// import { Link } from "react-router-dom";
import {
  faEdit,
  faTrashAlt,
  faRupeeSign,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Products extends Component {
  state = {
    mainData: [],
    ind: { prodCode: "", img: "", title: "", desc: [], ingredients: [] },
    productArray: { category: "", id: "" },
    LeftPanelArray: [],
    filteredArray: {},
    cartArray: this.props.cart,
    list: [
      "Sofa",
      "Cushions",
      "Mattress",
      "Bed",
      "Study Table",
      "Chair",
      "Bench",
      "Dining Table",
    ],
  };

  handleCart = (cart) => {
    if (this.props.loginData.role !== undefined) {
      console.log("ingradients", cart.ingredients);
      let localArray = this.state.cartArray;
      let temp;
      console.log(localArray);
      let obj = localArray.find((obj) => obj.prodCode === cart.prodCode);
      if (obj === undefined) localArray.push(cart);
      console.log(localArray);
      var totalTaxes = 0;
      this.props.onCart(localArray);
      totalTaxes = cart.ingredients.reduce(function (sum, tax) {
        return sum + tax.qty;
      }, 0);
      console.log(totalTaxes);
    } else {
      window.alert("Cannot add to the Cart You have not signed in!!!");
    }
  };
  handleInd = async (categoryy, idd) => {
    let { category, id } = this.props.match.params;
    let { productArray } = this.state;
    productArray.category = categoryy;
    productArray.id = idd;
    category = categoryy;
    id = idd;
    let localData = this.state.filteredArray;
    localData.selected = category;
    // console.log("Selected", localData);
    this.props.history.push({
      pathname: "/product/" + category + "/" + id,
    });
    this.setState({
      filteredArray: localData,
      productArray,
    });
    this.componentDidMount();
  };
  async componentDidMount() {
    let { category, id } = this.props.match.params;

    let responnse = await axios.get("http://localhost:2410/product");

    let localProductArray = await axios.get("http://localhost:2410/category");
    // console.log(localProductArray);
    // console.log(responnse);
    let tempData;
    let imgObject;
    let localImg = this.state.ind;
    if (category !== undefined) {
      tempData = responnse.data.filter((obj) => obj.category === category);
      imgObject = tempData.find((obj) => obj.prodCode === id);
      localImg.prodCode = imgObject.prodCode;
      localImg.title = imgObject.title;
      localImg.desc = imgObject.desc;
      localImg.img = imgObject.img;
      localImg.ingredients = imgObject.ingredients;
    } else {
      tempData = responnse.data;
    }
    this.setState({
      mainData: tempData,
      LeftPanelArray: localProductArray.data,
      ind: localImg,
    });
  }
  makeCbStructure = (view) => {
    let temp = {
      product: view,
      selected: "",
    };

    return temp;
  };
  handleleftPanel = (categoryy) => {
    let { category } = this.props.match.params;
    // console.log(category);

    if (category !== undefined) {
      categoryy.selected = category;
    }
    // console.log(categoryy);
  };
  handleEdit = () => {
    let { category, id } = this.props.match.params;
    console.log(category);
    this.props.history.push({
      pathname: "/product/" + category + "/" + id + "/edit",
    });
  };
  handleDelete = async () => {
    let { category, id } = this.props.match.params;
    let response = await axios.delete("http://localhost:2410/" + id);
    if (response.data === 200) {
      window.alert("your data has been deleted");
      this.props.history.push({
        pathname: "/product/" + category,
      });
    }
  };
  border(curInd) {
    if (this.state.ind.prodCode === curInd) return "2px solid blue";
    return "";
  }
  render() {
    // console.log(this.state.cartArray);
    // console.log(this.state.productArray);
    let product = this.makeCbStructure(this.state.LeftPanelArray);
    // this.state.filteredArray = product;
    // console.log(this.state.filteredArray);
    // console.log(product);
    return (
      <div className="mt-1">
        <div className="row col-12">
          <div className="col col-2">
            <LeftPanel
              productArray={product}
              onLeftPanel={this.handleleftPanel}
            />
          </div>
          <div className="col-6">
            {this.state.mainData.length === 0 ? (
              <center>
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="fa-spin fa-4x fa-fw"
                />
              </center>
            ) : (
              this.state.mainData.map((p, ind) => (
                <img
                  src={p.img}
                  alt=""
                  className="mb-4 ml-4"
                  width="200"
                  height="100"
                  key={ind}
                  onClick={() => this.handleInd(p.category, p.prodCode)}
                  style={{ border: this.border(p.prodCode), padding: "5px" }}
                />
              ))
            )}
          </div>
          <div className="col-4">
            {this.state.ind.img === "" ? (
              <h6>Choose a product!</h6>
            ) : (
              <div>
                {this.props.loginData.role === "admin" ? (
                  <div className="mb-2">
                    {/* <Link
                      to={
                        "/product/" +
                        this.state.productArray.category +
                        "/" +
                        this.state.productArray.id +
                        "/edit"
                      }
                    > */}
                    <button
                      className="btn btn-secondary text-white mr-3"
                      onClick={() => this.handleEdit()}
                    >
                      Edit product
                    </button>
                    {/* </Link> */}
                    <button
                      className="btn btn-secondary text-white"
                      onClick={() => this.handleDelete()}
                    >
                      Delete product
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <img src={this.state.ind.img} alt="" />
                <h5>{this.state.ind.title}</h5>
                <h6>{this.state.ind.desc}</h6>
                <h6>
                  Items in product
                  {this.state.ind.ingredients.map((p) => (
                    <div>
                      {p.ingName}- {p.qty}
                    </div>
                  ))}
                </h6>
                {this.props.loginData.role !== "admin" ? (
                  <button
                    className="btn btn-success"
                    onClick={() => this.handleCart(this.state.ind)}
                  >
                    Add to cart
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
