import React, { Component } from "react";
import axios from "axios";
import { Alert, Table } from "react-bootstrap";
var grandTotalPrice = 0;
var grandTotalBooks = 0;
var serialNum = 0;
var key = 0;
class Admindashboard extends Component {
  state = {
    message: "",
    atype: "",
    totalUsers: 0,
    totalBooks: 0,
    totalPrice: 0,
    // refreshTable: false,
    lengthOfdelArray: 0,
    allUsersData: [],
    delArray: [],
    srNo: 0,
  };

  componentDidMount() {
    this.setState({ srNo: 0 });
    axios
      .get(`http://localhost:8080/user/getusers`)
      .then((res) => {
        this.setState({ allUsersData: res.data });
      })
      .catch((errors) => {
        console.error(errors);
      });
  }
  priceCounter(user) {
    var usertotalPrice = 0;
    user.purchasedBooks.map((eachBook) => {
      usertotalPrice = usertotalPrice + parseInt(eachBook.price);
      return 0;
    });
    //! this.state.totalPrice = this.state.totalPrice + usertotalPrice;
    //! this.setState({ totalPrice: "o" });
    grandTotalPrice += usertotalPrice;
    return usertotalPrice;
  }
  booksCounter(user) {
    var userBooks = 0;
    user.purchasedBooks.map((eachBook) => {
      return (userBooks = userBooks + 1);
    });
    // this.state.totalBooks = this.state.totalBooks + userBooks;
    grandTotalBooks += userBooks;
    return userBooks;
  }
  usersCounter() {
    var totalUsers = 0;
    this.state.allUsersData.map((eachUser) => {
      return (totalUsers = totalUsers + 1);
    });
    return totalUsers;
  }
  totalBooksCounter() {
    return grandTotalBooks;
  }
  timer() {
    setTimeout(() => {
      this.setState({ showAlert: false, alertType: "", message: "" });
    }, 3000);
  }

  render() {
    return (
      <React.Fragment>
        <br />
        {this.state.atype && (
          <Alert variant={this.state.atype}>
            {this.state.lengthOfdelArray + " " + this.state.message}
          </Alert>
        )}

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
          <thead className="table-primary">
            <tr>
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
                Users &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </th>
              <th>
                User Email &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-at"
                  viewBox="0 0 20 20"
                >
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                </svg>
              </th>
              <th>
                Books Purchased &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-book-fill"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
              </th>
              <th>
                Amount spent &nbsp;&nbsp;
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
            {this.state.allUsersData.map((eachUser) => {
              serialNum++;
              return (
                <tr key={++key}>
                  <td>{serialNum}</td>
                  <td>{`${eachUser.firstName} ${eachUser.lastName}`}</td>
                  <td>{eachUser.email}</td>
                  <td>{this.booksCounter(eachUser)}</td>
                  <td>₹{this.priceCounter(eachUser)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
            marginTop: "40px",
            border: "2px solid black",
            borderRadius: "0px",
          }}
        >
          <thead className="table-success">
            <tr>
              <th>
                Total Users &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-people-fill"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fillRule="evenodd"
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                  />
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
              </th>
              <th>
                Total Books Purchased &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-stack"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.12 10.163l1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
                  <path d="M14.12 6.576l1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
                </svg>
              </th>
              <th>
                Total Revenue &nbsp;&nbsp;
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
            <tr>
              <td>{this.usersCounter()}</td>
              <td>{this.totalBooksCounter()}</td>
              <td>₹{parseInt(grandTotalPrice)}</td>
            </tr>
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}
// https://drive.google.com/u/1/uc?id=1N57SmOoBiAQLNUMw8qIWb0YpTTcTQW90&export=download <= Hulk download link
export default Admindashboard;
