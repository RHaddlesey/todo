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
      checked: false,
      editing: false
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
    let index = event.target.getAttribute("todo-key");
    let listValue = JSON.parse(localStorage.getItem("todos"));
    listValue.splice(index, 1);
    this.setState({ todos: listValue });
    localStorage.setItem("todos", JSON.stringify(listValue));
  };

  editItem = event => {
    console.log("edit pressed!");
    let index = event.target.getAttribute("todo-key");
    console.log("edit this", index);
  };

  checkItem = (name) => {
    console.log("check pressed!", name);
    // let index = event.target.getAttribute("todo-key");
    let checkValue = JSON.parse(localStorage.getItem("todos"));
    checkValue.forEach(element => {
      if( element.name === name) {
        console.log("found")
        element.checked = !element.checked
      }
      console.log("element", element)
    });
    this.setState({ todos: checkValue });
    localStorage.setItem("todos", JSON.stringify(checkValue));
  };

  render() {
    console.log("todos", this.state.todos);
    return (
      <div className="container">
        <h1>Todo List</h1>

        <div>
          <input type="text" placeholder="Add" ref={this.input}></input>

          <ul>
            {this.state.todos.map((item, i) => (
              <li key={i} className="list" style={{ textDecorationLine: item.checked ? "line-through" : "none", color: item.checked ? "black" : "white"}}>
                {item.name}
                {item.checked}
                <input
                  type="checkbox"
                  todo-key={i}
                  value="check"
                  checked={item.checked}
                  className="check_button"
                  onClick={() => this.checkItem(item.name)}
                />
{console.log("item", item)}
                <button
                  className="edit_button"
                  value="delete"
                  todo-key={i}
                  onClick={this.deleteItem}
                >
                  Remove
                </button>
                <button
                  className="edit_button"
                  value="edit"
                  todo-key={i}
                  onClick={this.editItem}
                >
                  Edit
                </button>

                <hr style={{ marginTop: 20 }} />
              </li>
            ))}
          </ul>
          <button onClick={this.addTask} className="button">
            Save my Todo's
          </button>
        </div>
      </div>
    );
  }
}

export default ToDo;
