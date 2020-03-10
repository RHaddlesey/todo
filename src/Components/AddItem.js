import React, { Component } from "react";
import "./AddItem.css";

export default class AddItem extends Component {
  userData;

  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ""
    };
  }

  onChangeName(e) {
    console.log("on change", e.target.value);
    this.setState({ name: e.target.value });
    console.log("name", this.state.name);
  }

  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("todo"));
    console.log("sdasjddh", this.userData.name);

    if (localStorage.getItem("todo")) {
      this.setState({
        name: this.userData.name
      });
    } else {
      this.setState({
        name: ""
      });
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("todo", JSON.stringify(nextState));
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      name: ""
    });
    console.log("submit", this.state.name);
  }

  render() {
    return (
      <div className="item_container">
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
