import React from "react";
import "./App.css";
import Todo from "./Components/ToDo";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <div className="App-body">
          <Todo />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
