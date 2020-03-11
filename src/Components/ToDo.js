// R Haddlesey

import React, { Component } from "react";
import uuid from "uuid";
import "./ToDo.css";

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
    this.state = {
      showEmptyWarning: false,
      todos: [
        //   { name: "Eggs", checked: false },
        //   { name: "Bread", checked: false },
        //   { name: "Milk", checked: false }
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
    if (this.input.current.value === "") {
      // alert("You must enter some date");
      this.setState({showEmptyWarning : true})
      return;
    } else {
      this.setState({showEmptyWarning : false})
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
    }
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

  editItem = name => {
    var editing = false;
    console.log("edit pressed!");
    let editValue = JSON.parse(localStorage.getItem("todos"));
    editValue.forEach(element => {
      if (element.name === name) {
        console.log("found");
        element.editing = !element.editing;
      }
      console.log("element", element);
    });
    this.setState({ todos: editValue, currentEdit: name });
    console.log("name name name", name);
    localStorage.setItem("todos", JSON.stringify(editValue));
  };

  // when clicked, this will save the new name over the old name and reset checked and editing to false
  // it will also hide the 'save todos' button so it will only save the edit
  saveEdit = () => {
    console.log("save the edit", this.state.currentEdit);
    let saveEditValue = JSON.parse(localStorage.getItem("todos"));
    saveEditValue.forEach(element => {
      if (element.editing === true) {
        console.log("found");
        element.name = this.state.currentEdit;
        element.checked = false;
        element.editing = false;
      }
      console.log("element", element, this.state.currentEdit);
    });
    this.setState({ todos: saveEditValue, editing: !this.state.editing });
    localStorage.setItem("todos", JSON.stringify(saveEditValue));
  };

  checkItem = name => {
    console.log("check pressed!", name);
    // let index = event.target.getAttribute("todo-key");
    let checkValue = JSON.parse(localStorage.getItem("todos"));
    checkValue.forEach(element => {
      if (element.name === name) {
        console.log("found");
        element.checked = !element.checked;
      }
      console.log("element", element);
    });
    this.setState({ todos: checkValue });
    localStorage.setItem("todos", JSON.stringify(checkValue));
  };

  render() {
    // console.log("todos", this.state.todos);
    return (
      <div className="container">
        <h1>Todo List</h1>

        <div>
          <input type="text" placeholder="Add" ref={this.input}></input>
          {this.state.showEmptyWarning ? (<div className="warning">Please enter a value</div>) : (<div></div>)}
          <ul>
            {this.state.todos.map((item, i) => (
              <li
                key={i}
                className="list"
                style={{
                  textDecorationLine: item.checked ? "line-through" : "none",
                  color: item.checked ? "black" : "white"
                }}
              >
                {item.editing ? (
                  <input
                    type="text"
                    style={{ width: "50%" }}
                    placeholder="Add"
                    value={this.state.currentEdit}
                    onChange={event =>
                      this.setState({
                        currentEdit: event.target.value,
                        editing: true
                      })
                    }
                  ></input>
                ) : (
                  item.name
                )}
                

                <input
                  type="checkbox"
                  todo-key={i}
                  value="check"
                  checked={item.checked}
                  onChange={() => this.checkItem(item.name)}
                  className="check_button"
                  // onClick={}
                />

                <button
                  className="edit_button"
                  value="delete"
                  todo-key={i}
                  onClick={this.deleteItem}
                >
                  Remove
                </button>
                {item.editing === true ? (
                  <button
                    className="edit_button"
                    value="edit"
                    todo-key={i}
                    onClick={() => this.saveEdit(item.name)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="edit_button"
                    value="edit"
                    todo-key={i}
                    onClick={() => this.editItem(item.name)}
                  >
                    Edit
                  </button>
                )}

                <hr style={{ marginTop: 20 }} />
              </li>
            ))}
          </ul>
          {this.state.editing !== true ? (
            <button onClick={this.addTask} className="button">
              Save my Todo's
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default ToDo;
