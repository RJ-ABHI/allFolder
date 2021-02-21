import React, { Component } from "react";
import axios from "axios";
class Main extends Component {
  state = {
    mainData: {},
    inpData: {
      prodCode: "",
      title: "",
      img: "",
      category: "",
      desc: [],
      ingredients: [{ ingName: "", qty: "" }],
    },
  };
  async componentDidMount() {
    let { id } = this.props.match.params;
    // console.log(category);
    let response = await axios.get("http://localhost:2410/edit/" + id);
    console.log(response);
    this.setState({ mainData: response.data });
  }
  addDesc = () => {
    let view = "";
    let localData = this.state.mainData;
    localData.desc.push(view);
    // console.log(localData);
    this.setState({ mainData: localData });
  };
  handleDltDesc = (view) => {
    console.log(view);
    let localData = this.state.mainData;
    localData.desc.splice(view, 1);
    this.setState({ mainData: localData });
  };
  addIngrident = () => {
    let view = "";
    let localData = this.state.mainData;
    localData.ingredients.push(view);
    // console.log(localData);
    this.setState({ mainData: localData });
  };
  handleDltIngrident = (view) => {
    let localData = this.state.mainData;
    localData.ingredients.splice(view, 1);
    this.setState({ mainData: localData });
  };
  handleChange = (e) => {
    let { currentTarget: inp } = e;
    let localData = this.state.mainData;
    console.log(inp.value);
    console.log(inp.name);
    if (inp.id === "desc") {
      let name = inp.name.split(" ")[0];
      let changeInd = parseInt(inp.name.split(" ")[1]);
      console.log(changeInd);
      localData[name][changeInd] = inp.value;
    } else if (inp.id === "ingredients") {
      console.log(localData[inp.name]);
      // localData[inp.id][inp.name] = inp.value;
      // console.log();
    } else {
      localData[inp.name] = inp.value;
    }

    console.log(localData);
    this.setState({ mainData: localData });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let { id, category } = this.props.match.params;
    let response = await axios.put(
      "http://localhost:2410/editCat/" + id,
      this.state.mainData
    );
    console.log(response);

    console.log(category);
    this.props.history.push({
      pathname: "/product/" + category + "/" + id,
    });
  };
  render() {
    console.log(this.state.mainData);
    return (
      <div className="container mt-3">
        <div className="row col-12">
          <form action="" className="col col-6" onSubmit={this.handleSubmit}>
            <div className="">
              <div className="form-group">
                <label htmlFor="prodCode" className="font-weight-bold">
                  Product Code
                </label>
                <input
                  type="text"
                  name="prodCode"
                  id="prodCode"
                  className="form-control"
                  value={this.state.mainData.prodCode || ""}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title" className="font-weight-bold">
                  Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  value={this.state.mainData.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="img" className="font-weight-bold">
                  Image URL
                </label>
                <input
                  type="text"
                  name="img"
                  id="img"
                  className="form-control"
                  value={this.state.mainData.img}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="font-weight-bold">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={this.state.mainData.category}
                  className="form-control"
                  onChange={this.handleChange}
                >
                  <option value="Dining">Dining</option>
                  <option value="Drawing">Drawing</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Study">Study</option>
                </select>
              </div>
              <button
                className="btn btn-secondary text-white"
                onClick={() => this.addDesc()}
              >
                Add description
              </button>
              {this.state.mainData.desc !== undefined
                ? this.state.mainData.desc.map((p, ind) => (
                    <div className="row mt-2" key={ind}>
                      <div className="col-11">
                        <input
                          type="text"
                          name={"desc " + ind}
                          id="desc"
                          className="form-control"
                          value={p}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-1">
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDltDesc(ind)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))
                : ""}
              <button
                className="btn btn-secondary text-white mt-4"
                onClick={() => this.addIngrident()}
              >
                Add items shipped with product
              </button>
              {this.state.mainData.ingredients !== undefined
                ? this.state.mainData.ingredients.map((p, ind) => (
                    <div className="row mt-2" key={ind}>
                      <div className="col-7">
                        <input
                          type="text"
                          name={"ingName"}
                          id="ingredients"
                          className="form-control"
                          value={p.ingName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-4">
                        <input
                          type="number"
                          name={"qty"}
                          id="ingredients"
                          className="form-control"
                          value={p.qty}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-1">
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDltIngrident(ind)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))
                : ""}
              <button className="btn btn-primary mt-3">Edit details</button>
            </div>
          </form>
          <div className="col col-6">
            <div className="row">
              {" "}
              <img
                src={this.state.mainData.img}
                alt=""
                className="mx-auto"
                width="70%"
                // style={{ alignItems: "center" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
