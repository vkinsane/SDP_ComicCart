import React, { Component } from "react";
import axios from "axios";
import { Button, Card, Alert, Row, Table } from "react-bootstrap";
import ImageHelper from "./imagehelper.component";
class Cart extends Component {
  state = {
    userCart: [],
    bookRemoved: false,
    alertType: "",
    message: "",
    srNo: 0,
    hideBillCard: "",
    check: "",
    showAlert: "",
    payload: [],
    purchasedBooks: [],
    proceedToPayment: false,
    totalAmount: 0,
  };
  componentDidMount() {
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
  }
  removeFromCart = ({ target }) => {
    const { value } = target;
    console.log(
      this.state.userCart.filter(
        (bookInUserCart) => bookInUserCart._id === value
      )[0]
    );

    this.state.userCart.splice(
      this.state.userCart.indexOf(
        this.state.userCart.filter(
          (bookInUserCart) => bookInUserCart._id === value
        )[0],
        0
      ),
      1
    );
    // console.log(this.state);
    axios({
      url: `http://localhost:8080/user/updateusercart/${localStorage.getItem(
        "userId"
      )}`,
      method: "PUT", //check here put
      data: { cart: this.state.userCart },
    }).then(() => {
      if (this.state.userCart == "") {
        this.setState({
          showAlert: true,
          alertType: "info",
          message: "Your cart is empty please add something in your cart!",
        });
      } else {
        this.setState({
          showAlert: true,
          alertType: "warning",
          message: "Book removed",
        });
      }
    });
  };
  booksToDashboard = () => {
    this.setState({
      proceedToPayment: true,
      alertType: "success",
      message: "Redirecting!",
    });
    // const { value } = target;
    // axios
    //   .get(
    //     `http://localhost:8080/user/getuser/${localStorage.getItem("userId")}`
    //   )
    //   .then((res) => {
    //     this.setState({ purchasedBooks: res.data.purchasedBooks });
    //     this.state.purchasedBooks = this.state.purchasedBooks.concat(
    //       this.state.userCart
    //     );
    //     // send book to user's dashboard

    //     axios({
    //       url: `http://localhost:8080/user/updatepurchasedbooks/${localStorage.getItem(
    //         "userId"
    //       )}`,
    //       method: "PUT", //check here put
    //       data: { purchasedBooks: this.state.purchasedBooks },
    //     })
    //       .then(() => {
    //         console.log("Successful");
    //         this.setState({
    //           proceedToPayment: true,
    //           alertType: "success",
    //           message: "Successfully Updated Purchased books 👍",
    //         });
    localStorage.setItem("totalAmount", this.state.totalAmount);
    //       })
    //       .catch(() => {
    //         console.log("Internal Server error");
    //         this.setState({
    //           proceedToPayment: false,
    //           alertType: "danger",
    //           message: "There was an error!",
    //         });
    //       });
    //     // *****************************
    //   })
    //   .catch(() => {
    //     console.log("there was some error");
    //   });
    // Emptying user cart
    // axios({
    //   url: `http://localhost:8080/user/updateusercart/${localStorage.getItem(
    //     "userId"
    //   )}`,
    //   method: "PUT",
    //   data: { cart: [] },
    // }).then(() => {
    //   console.log("Emptied User cart");
    // });
  };
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
  priceCounter = () => {
    var totalPrice = 0;
    this.state.userCart.map((eachBook) => {
      totalPrice = totalPrice + parseInt(eachBook.price);
    });
    this.state.totalAmount = totalPrice;
    return totalPrice;
  };
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
          {this.state.userCart.map((eachBook) => {
            return (
              <Card border="secondary" style={{ width: "20rem" }}>
                <ImageHelper book={eachBook} />
                <Card.Header>
                  <h4>{eachBook.bookName}</h4>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Author : {eachBook.author}</Card.Title>
                  <Card.Text>Description is to be added here</Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={this.removeFromCart}
                    block
                    value={eachBook._id}
                  >
                    Remove From Cart
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
          {/* </CardDeck> */}
        </Row>
        {/* <div className="fixed-top"> */}
        {!this.state.hideBillCard && (
          <React.Fragment>
            <Card
              className="float-right"
              border="primary"
              style={{ width: "18rem" }}
            >
              <Card.Header>Bill</Card.Header>
              <Card.Body>
                <Card.Title>ComicCart Bill</Card.Title>
                <Card.Text>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        {/* <th>#</th> */}
                        <th>Item Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.userCart.map((eachBook) => {
                        // this.state.srNo = this.state.srNo + 1;
                        // this.state.price = this.state.price + eachBook.price;
                        return (
                          <tr>
                            {/* <td>{this.state.srNo}</td> */}
                            <td>{eachBook.bookName}</td>
                            <td>₹{eachBook.price}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td>Total Price</td>
                        {/* <td>₹{this.priceCounter(this.state.userCart)}</td> */}
                        <td>₹{this.priceCounter()}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    variant="primary"
                    onClick={this.booksToDashboard}
                    block
                  >
                    Proceed to checkout
                  </Button>

                  {/* <Button
                  variant="outline-primary"
                  id={localStorage.getItem("userEmail")}
                  onClick={this.sendMail}
                  block
                >
                  Send Mail
                </Button> */}
                </Card.Text>
              </Card.Body>
            </Card>
            &nbsp;&nbsp;&nbsp;
          </React.Fragment>
        )}
        {/* {this.state.proceedToPayment &&
          (window.open(`/payment/${this.state.totalAmount}`, "_self"),
          window.close())} */}
        {this.state.proceedToPayment &&
          (window.open(`/payment`, "_self"), window.close())}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Cart;
