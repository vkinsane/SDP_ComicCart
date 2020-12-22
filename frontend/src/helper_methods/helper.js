import React, { Component } from "react";
import { Nav } from "react-bootstrap";
export default class Helper extends Component {
  render() {
    if (JSON.parse(localStorage.getItem("userData"))) {
      if (JSON.parse(localStorage.getItem("userData")).role === 1) {
        return (
          <React.Fragment>
            <Nav.Link href="/addbook">Add Book</Nav.Link>
            <Nav.Link href="/updatebook">Update Book</Nav.Link>
            <Nav.Link href="/deletebook">Delete Book</Nav.Link>
          </React.Fragment>
        );
      }
      if (JSON.parse(localStorage.getItem("userData")).role === 0) {
        return (
          <React.Fragment>
            <Nav.Link></Nav.Link>
          </React.Fragment>
        );
      }
    } else {
      // return <div>Non admin</div>;
      return <div></div>;
    }
  }
}
