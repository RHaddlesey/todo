import React from 'react';
import './ToDo.css'

class ToDo extends React.Component {
  constructor(props) {
  super (props)

  // set up empty list to start
  this.state={
    todos:[]
  }
}

  render() {
    return(
      <div className={styles.container}>
        <h1 className={styles.h1}>Todo List</h1>
      </div>
    )
  }
}

const styles = {
  body: {
    backgroundColor: "#2e89dd",
    color: "white"
  },

  h1: {
    fontSize: 38,
    color: "white"
  },
  
  input: {
    width: "30%",
    margin: 8,
    border: "none",
    borderRadius: 15,
    backgroundColor: "rgb(197, 193, 193)",
    color: "rgb(10, 10, 10)",
  },
  
  button: {
    backgroundColor: "white",
    border: "none",
    color: "black",
    padding: 10,
    textAlign: "center",
    textDecoration: "none",
    margin: 4,
  
  },
  
  container: {
    backgroundColor: "#2e89dd",
    borderStyle: "hidden",
    borderRadius: 15,
    padding: 18,
    textAlign: "center"
  },
}

export default ToDo;