// R Haddlesey

import React, { Component } from "react";
import uuid from "uuid";
import "./ToDo.css";

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
    this.state = {
      todos: [
        { name: "Eggs", checked: false },
        { name: "Bread", checked: false },
        { name: "Milk", checked: false }
      ]
    };
  }

  addTask = () => {
    const Items = {
      id: uuid.v4(),
      name: this.input.current.value,
      date: new Date().toUTCString(),
      checked: false
    };

    if (localStorage.getItem("todos") == null) {
      const todos = [];
      todos.push(Items);
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      const todos = JSON.parse(localStorage.getItem("todos"));
      todos.push(Items);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    this.setState({
      todos: JSON.parse(localStorage.getItem("todos"))
    });
  };

  componentDidMount() {
    const todos = window.localStorage.getItem("todos");
    const parsedTodos = JSON.parse(todos);
    if (todos == null) {
      return false;
    } else {
      this.setState({
        todos: parsedTodos
      });
      console.log(this.state.todos);
    }
  }

  deleteItem = event => {
    let index = event.target.getAttribute("data-key");
    let listValue = JSON.parse(localStorage.getItem("todos"));
    listValue.splice(index, 1);
    this.setState({ todos: listValue });
    localStorage.setItem("todos", JSON.stringify(listValue));
  };

  editItem = event => {
    console.log("edit pressed!");
  };

  render() {
    console.log("todos", this.state.todos);
    return (
      <div className="container">
        <h1>Todo List</h1>

        <div>
          <input type="text" placeholder="AddTask..." ref={this.input}></input>
          <button onClick={this.addTask} className="button">
            Add
          </button>
          <ul>
            {this.state.todos.map((item, i) => (
              <li key={i}>
                {item.name}
                <button
                  className="edit_button"
                 
                  value="delete"
                  data-key={i}
                  onClick={this.deleteItem}
                >
                  Remove
                </button>
                <button
                  className="edit_button"
                 
                  value="edit"
                  data-key={i}
                  onClick={this.editItem}
                >
                  Edit
                </button>

                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDo;
