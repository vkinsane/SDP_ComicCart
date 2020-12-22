import React, { Component } from "react";
import axios from "axios";
import { Button, Card, Alert, Row } from "react-bootstrap";
import ImageHelper from "./imagehelper.component";
class Dashboard extends Component {
  state = {
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
    var statusCode = pageUrl.substring(indexOfStatus + 10, pageUrl.length);
    this.state.statusCode = statusCode;
    if (statusCode == 1) {
      this.setState({
        showAlert: true,
        alertType: "info",
        message:
          "Your Purchase was successfull. Book has been added to your dashboard 👍",
      });
    }
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/user/getuser/${localStorage.getItem("userId")}`
      )
      .then((res) => {
        this.setState({ purchasedBooks: res.data.purchasedBooks });
        if (this.state.purchasedBooks == "") {
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
    if (this.state.statusCode == 1) {
      // getting user's cart into this.userCart****
      axios
        .get(
          `http://localhost:8080/user/getuser/${localStorage.getItem("userId")}`
        )
        .then((res) => {
          this.setState({ userCart: res.data.cart });
          // console.log(this.state.userCart);
          if (this.state.userCart == "") {
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
          `http://localhost:8080/user/getuser/${localStorage.getItem("userId")}`
        )
        .then((res) => {
          this.setState({ purchasedBooks: res.data.purchasedBooks });
          this.state.purchasedBooks = this.state.purchasedBooks.concat(
            this.state.userCart
          );
          console.log(this.state.purchasedBooks);
          // send book to user's dashboard
          axios({
            url: `http://localhost:8080/user/updatepurchasedbooks/${localStorage.getItem(
              "userId"
            )}`,
            method: "PUT", //check here put
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
    if (this.state.statusCode == 1) {
      // Emptying user cart ******
      axios({
        url: `http://localhost:8080/user/updateusercart/${localStorage.getItem(
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
      url: "http://localhost:8080/user/sendmail",
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
        <Row>
          {/* <CardDeck> */}
          {this.state.purchasedBooks.map((eachBook) => {
            return (
              <React.Fragment>
                <Card border="secondary" style={{ width: "20rem" }}>
                  <ImageHelper book={eachBook} />
                  <Card.Header>
                    <h4>{eachBook.bookName}</h4>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Author : {eachBook.author}</Card.Title>
                    <Card.Text>Description is to be added here</Card.Text>
                    {/* <a
                    href="https://drive.google.com/file/d/1lz5rjFogSIu3FP8Vt1S8U5DmZv2uAqA5/view?usp=sharing"
                    download
                  > */}
                    {/* add this `&export=download` to your book link to get download link */}
                    <Button
                      variant="outline-success"
                      block
                      value={eachBook._id}
                      href={eachBook.link}
                      download={`${eachBook.bookName}` + ".pdf"}
                    >
                      Download
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
