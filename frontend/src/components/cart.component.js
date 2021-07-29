import React, { Component } from "react";
import axios from "axios";
import { Button, Card, Alert, Row, Table } from "react-bootstrap";
import ImageHelper from "./imagehelper.component";
var key = 0;
var key2 = 0;
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
        `https://backend-api-comiccart.herokuapp.com/user/getuser/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((res) => {
        this.setState({ userCart: res.data.cart });
        // console.log(this.state.userCart);
        if (this.state.userCart.length === 0) {
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
      url: `https://backend-api-comiccart.herokuapp.com/user/updateusercart/${localStorage.getItem(
        "userId"
      )}`,
      method: "PUT", //check here put
      data: { cart: this.state.userCart },
    }).then(() => {
      if (this.state.userCart.length === 0) {
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
    localStorage.setItem("totalAmount", this.priceCounter());
  };

  showMessage = () => {
    this.setState({
      showAlert: true,
      alertType: "warning",
      message: "Please add something in cart to proceed",
    });
  };

  sendMail = ({ target }) => {
    const { id } = target;
    const payLoad = {
      email: id,
    };
    axios({
      url: "https://backend-api-comiccart.herokuapp.com/user/sendmail",
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
      return 0;
    });
    // this.state.totalAmount = totalPrice;

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
              <React.Fragment key={++key}>
                <Card
                  className="shadow bg-white rounded"
                  border="secondary"
                  style={{ width: "20rem" }}
                >
                  <ImageHelper book={eachBook} />
                  <Card.Header>
                    <h4>{eachBook.bookName}</h4>
                  </Card.Header>
                  <Card.Body>
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
                    {/* ********************* */}
                    <Button
                      variant="outline-primary"
                      onClick={this.removeFromCart}
                      block
                      value={eachBook._id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-cart-x"
                        viewBox="0 0 20 20"
                      >
                        <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                      Remove From Cart
                    </Button>
                  </Card.Body>
                </Card>
                &nbsp;&nbsp;&nbsp;
              </React.Fragment>
            );
          })}
          {/* </CardDeck> */}
        </Row>
        {/* <div className="fixed-top"> */}
        {!this.state.hideBillCard && (
          <React.Fragment>
            <Card
              // className="floa  t-right"
              border="primary"
              style={{ width: "18rem", left: "85%" }}
            >
              <Card.Header>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-calculator"
                  viewBox="0 0 20 20"
                >
                  <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z" />
                </svg>
                Bill
              </Card.Header>
              <Card.Body>
                <Card.Title>ComicCart Bill</Card.Title>
                {/* <Card.Text> */}
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
                      return (
                        <tr key={++key2}>
                          <td>{eachBook.bookName}</td>
                          <td>₹{eachBook.price}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>Total Price</td>
                      <td>₹{this.priceCounter()}</td>
                    </tr>
                  </tbody>
                </Table>
                <Button
                  variant="primary"
                  onClick={
                    this.priceCounter() === 0
                      ? this.showMessage
                      : this.booksToDashboard
                  }
                  block
                >
                  Proceed to checkout&nbsp;&nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="18"
                    fill="currentColor"
                    className="bi bi-credit-card"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                  </svg>
                </Button>

                {/* <Button
                  variant="outline-primary"
                  id={localStorage.getItem("userEmail")}
                  onClick={this.sendMail}
                  block
                >
                  Send Mail
                </Button> */}
                {/* </Card.Text> */}
              </Card.Body>
            </Card>
            &nbsp;&nbsp;&nbsp;
          </React.Fragment>
        )}
        {/* {this.state.proceedToPayment &&
          (window.open(`/payment/${this.state.totalAmount}`, "_self"),
          window.close())} */}
        {this.state.proceedToPayment &&
          (window.open(`/payment`), window.close())}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Cart;
