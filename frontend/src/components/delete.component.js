import React, { Component } from "react";
import axios from "axios";
import { Alert, Form, Table, Button } from "react-bootstrap";
var serialNum = 0;
var key = 0;
class Deletebook extends Component {
  state = {
    message: "",
    atype: "",
    // refreshTable: false,
    lengthOfdelArray: 0,
    allbooks: [],
    delArray: [],
    srNo: 0,
  };
  componentDidMount() {
    this.setState({ srNo: 0 });
    axios
      .get(`http://localhost:8080/book/`)
      .then((res) => {
        this.setState({ allbooks: res.data });
      })
      .catch((errors) => {
        console.error(errors);
      });
  }
  handleChange = ({ target }) => {
    serialNum = 0;
    //taking element on which this method is applied, target is a keyword
    const { checked, value } = target;
    if (checked) {
      this.state.delArray.push(value);
    }
    if (!checked) {
      const element = this.state.delArray.indexOf(value);
      this.state.delArray.splice(element);
    }
    this.setState({ lengthOfdelArray: this.state.delArray.length });
    console.log(this.state.delArray);
  };
  delMultiple = () => {
    this.state.delArray.map((eachBookId) => {
      axios
        .delete(`http://localhost:8080/book/deleteBook/${eachBookId}`)
        .then((res) => {
          this.setState({
            message: "Book Deleted Successfully",
            atype: "success",
            delArray: [],
          });
          console.log(`Successfully deleted ${eachBookId}`);
          this.componentDidMount();
          //   console.log(this.state.allbooks.find({ bookName: "Book 2" }));
        })
        .catch((errors) => {
          //   console.error(errors);
          console.log("Failed to delete");
        });
      return 0;
    });
  };
  render() {
    return (
      <React.Fragment>
        <br />
        {this.state.atype && (
          <Alert variant={this.state.atype}>
            {this.state.lengthOfdelArray + " " + this.state.message}
          </Alert>
        )}
        <Button
          className="shadow-lg"
          // className="float-right"
          style={{
            marginLeft: "73%",
          }}
          variant="danger"
          onClick={this.delMultiple}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 20 20"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
          &nbsp;&nbsp; Delete Multiple
        </Button>

        <br />
        <br />
        {/* <h6 className="float-right"></h6> */}
        <Table
          className="shadow-lg bg-white rounded"
          striped
          bordered
          hover
          variant="light"
          style={{
            alignContent: "center",
            width: "80%",
            marginLeft: "10%",
            border: "2px solid black",
            borderRadius: "0px",
          }}
        >
          <thead className="table-warning">
            <tr>
              <th>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-ui-checks"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                </svg>
              </th>
              <th>
                Sr. No. &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-sort-down-alt"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z" />
                </svg>
              </th>
              <th>
                Book Name &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-book"
                  viewBox="0 0 20 20"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
              </th>
              <th>
                Author &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-person-lines-fill"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
              </th>
              <th>
                Price &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-cash-stack"
                  viewBox="0 0 20 20"
                >
                  <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.allbooks.map((eachBook) => {
              serialNum++;
              return (
                <tr key={++key}>
                  <td>
                    <Form.Check
                      onChange={this.handleChange}
                      value={eachBook._id}
                    />
                  </td>
                  <td>{serialNum}</td>
                  <td>{eachBook.bookName}</td>
                  <td>{eachBook.author}</td>
                  <td>₹{eachBook.price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}
export default Deletebook;
