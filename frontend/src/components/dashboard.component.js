import React, { Component } from "react";
import axios from "axios";
import { Button, Card, Alert, Row } from "react-bootstrap";
import ImageHelper from "./imagehelper.component";

var key = 0;
var statusCode;
class Dashboard extends Component {
  state = {
    scrWidth: window.innerWidth,
    userCart: [],
    purchasedBooks: [],
    fetchedBooks: [],
    bookRemoved: false,
    alertType: "",
    message: "",
    srNo: 0,
    hideBillCard: "",
    check: "",
    showAlert: "",
    statusCode: 0,
  };

  checkStatus() {
    var pageUrl = window.location.pathname;
    var indexOfStatus = pageUrl.indexOf("dashboard");
    statusCode = parseInt(
      pageUrl.substring(indexOfStatus + 10, pageUrl.length)
    );
    this.setState({ statusCode: statusCode });
    if (statusCode === 1) {
      this.setState({
        showAlert: true,
        alertType: "info",
        message:
          "Your Purchase was successfull. Book has been added to your dashboard 👍",
      });
    }
    if (statusCode === 2) {
      this.setState({
        showAlert: true,
        alertType: "danger",
        message: "Your Purchase was failed. Try again!!!",
      });
    }
  }
  componentDidMount() {
    axios
      .get(
        `https://sdp-comiccart-backend.onrender.com/user/getuser/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((res) => {
        this.setState({ purchasedBooks: res.data.purchasedBooks });
        if (this.state.purchasedBooks === "") {
          this.setState({
            showAlert: true,
            alertType: "info",
            message: "You have not purchased any book yet!",
          });
        }
      })
      .catch(() => {
        console.log("there was some error");
      });
    this.checkStatus();
    if (statusCode === 1) {
      // getting user's cart into this.userCart****
      axios
        .get(
          `https://sdp-comiccart-backend.onrender.com/user/getuser/${localStorage.getItem(
            "userId"
          )}`
        )
        .then((res) => {
          this.setState({ userCart: res.data.cart });
          // console.log(this.state.userCart);
          if (this.state.userCart === "") {
            this.setState({
              showAlert: true,
              alertType: "info",
              message: "Your cart is empty please add something in your cart!",
            });
          }
          // console.log(this.state.userCart);
        })
        .catch((errors) => {
          // console.error(errors);
          this.setState({
            showAlert: true,
            hideBillCard: true,
            alertType: "danger",
            message: "There was an error try logging in again",
          });
          console.log(errors);
        });
      // ****
      // taking already purchased book data and concat with this.userCart *****
      axios
        .get(
          `https://sdp-comiccart-backend.onrender.com/user/getuser/${localStorage.getItem(
            "userId"
          )}`
        )
        .then((res) => {
          this.setState({ purchasedBooks: res.data.purchasedBooks });
          this.setState({
            purchasedBooks: this.state.purchasedBooks.concat(
              this.state.userCart
            ),
          });
          console.log(this.state.purchasedBooks);
          // send book to user's dashboard
          axios({
            url: `https://sdp-comiccart-backend.onrender.com/user/updatepurchasedbooks/${localStorage.getItem(
              "userId"
            )}`,
            method: "PUT",
            data: { purchasedBooks: this.state.purchasedBooks },
          })
            .then(() => {
              console.log("Successful");
              this.setState({
                alertType: "success",
                message: "Successfully Updated Purchased books 👍",
              });
              localStorage.setItem("totalAmount", this.state.totalAmount);
              this.emptyUserCart();
            })
            .catch(() => {
              console.log("Internal Server error");
              this.setState({
                alertType: "danger",
                message: "There was an error!",
              });
            });
        })
        .catch(() => {
          console.log("there was some error");
        });
      // *****
    }
  }
  emptyUserCart() {
    if (statusCode === 1) {
      // Emptying user cart ******
      axios({
        url: `https://sdp-comiccart-backend.onrender.com/user/updateusercart/${localStorage.getItem(
          "userId"
        )}`,
        method: "PUT",
        data: { cart: [] },
      }).then(() => {
        console.log("Emptied User cart");
      });
      // ******
    }
  }

  sendMail = ({ target }) => {
    const { id } = target;
    const payLoad = {
      email: id,
    };
    axios({
      url: "https://sdp-comiccart-backend.onrender.com/user/sendmail",
      method: "POST",
      data: payLoad,
    })
      .then((res) => {
        this.setState({
          showAlert: true,
          // check: true,
          alertType: "success",
          message: "Mail has been sent to you",
          // message: res.data.message,
          // redirect: true,
        });
        console.log(res);
      })
      .catch((res) => {
        this.setState({
          alertType: "danger",
          message: "Send mail req to backend failure",
        });
        console.log(res);
        console.log("problem");
      });
  };

  timer() {
    setTimeout(() => {
      this.setState({ showAlert: false, alertType: "", message: "" });
    }, 3000);
  }

  render() {
    return (
      <React.Fragment>
        {!this.timer() && this.state.showAlert && (
          <Alert variant={this.state.alertType}>{this.state.message}</Alert>
        )}
        {/* {this.state.check && (
          <Alert variant="success">Mail has been sent to you</Alert>
        )} */}
        <Row
          className="m-auto"
          style={{
            width: this.state.scrWidth < 693 ? "min-content" : "",
          }}
        >
          {/* <CardDeck> */}
          {this.state.purchasedBooks.map((eachBook) => {
            return (
              <React.Fragment key={++key}>
                <Card
                  className="shadow-lg bg-white rounded mb-3 ml-lg-4"
                  border="secondary"
                  style={{
                    // maxHeight: "200px",
                    // height: "50vh",
                    fontSize: "1px",
                    maxWidth: "315px",
                    width: "54vw",
                    minWidth: "288px",
                  }}
                >
                  <ImageHelper book={eachBook} />
                  <Card.Header className="py-1">
                    <h4>{eachBook.bookName}</h4>
                  </Card.Header>
                  <Card.Body className="pr-3 py-2">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <Card.Title>Author</Card.Title>
                          </td>
                          <td>
                            <Card.Title>:</Card.Title>
                          </td>
                          <td>
                            <Card.Title>{eachBook.author}</Card.Title>
                          </td>
                        </tr>
                        <tr className="text-left">
                          <td>
                            <Card.Title>Price</Card.Title>
                          </td>
                          <td>
                            <Card.Title>:</Card.Title>
                          </td>

                          <td>
                            <Card.Title>₹{eachBook.price}</Card.Title>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* <Card.Title>Author : {eachBook.author}</Card.Title>

                    <Card.Text>Price : ₹{eachBook.price}</Card.Text> */}
                    {/* <Card.Text>Description is to be added here</Card.Text> */}
                    {/* <a
                    href="https://drive.google.com/file/d/1lz5rjFogSIu3FP8Vt1S8U5DmZv2uAqA5/view?usp=sharing"
                    download
                  > */}
                    {/* add this `&export=download` to your book link to get download link */}
                    <Button
                      variant="outline-success"
                      // className="text-center"
                      block
                      value={eachBook._id}
                      href={eachBook.link}
                      download={`${eachBook.bookName}.pdf`}
                    >
                      Download &nbsp;&nbsp;
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-download"
                        viewBox="0 0 25 21"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                    </Button>
                    {/* </a> */}
                  </Card.Body>
                </Card>
                &nbsp;&nbsp;&nbsp;
              </React.Fragment>
            );
          })}
          {/* </CardDeck> */}
        </Row>
      </React.Fragment>
    );
  }
}
// https://drive.google.com/u/1/uc?id=1N57SmOoBiAQLNUMw8qIWb0YpTTcTQW90&export=download <= Hulk download link
export default Dashboard;
