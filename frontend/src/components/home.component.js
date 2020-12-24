import React, { Component } from "react";
import { Alert, Button, CardDeck, Card, Row } from "react-bootstrap";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import axios from "axios";
import ImageHelper from "./imagehelper.component";
import Navrouter from "./navbar_routing.component";
// import imageurl from "../../src/assets/images/cardimage.webp";
class Home extends Component {
  state = {
    allbooks: [],
    imageurl: "",
    cartArray: [],
    payload: [],
    bookAddedToCart: "",
    alertType: "",
    message: "",
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8080/book/`)
      .then((res) => {
        this.setState({ allbooks: res.data });
      })
      .catch((errors) => {
        console.error(errors);
      });

    if (localStorage.getItem("userId")) {
      axios
        .get(
          `http://localhost:8080/user/getuser/${localStorage.getItem("userId")}`
        )
        .then((res) => {
          this.setState({ payload: res.data.cart });
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  }

  addToCart = ({ target }) => {
    const { value } = target;
    // this.state.payload.push(value);
    if (localStorage.getItem("isLoggedIn")) {
      axios
        .get(`http://localhost:8080/book/${value}`)
        .then((res) => {
          this.state.payload.push(res.data);
          axios({
            url: `http://localhost:8080/user/updateusercart/${localStorage.getItem(
              "userId"
            )}`,
            method: "PUT", //check here put
            data: { cart: this.state.payload },
          })
            .then(() => {
              console.log("Successful");
              // this.setState({ bookAddedToCart: true });
              this.setState({
                showAlert: true,
                alertType: "success",
                message: "Book has been added to your cart 👍",
              });
            })
            .catch(() => {
              console.log("Internal Server error");
              this.setState({
                showAlert: true,
                alertType: "danger",
                message: "There was an error!",
              });
            });
        })
        .catch(() => {
          console.log("there was some error");
        });

      console.log(this.state.payload);
    } else {
      this.setState({
        showAlert: true,
        alertType: "danger",
        message: "Please login to proceed!",
      });
    }
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
        <Row>
          {/* <CardDeck style={{ width: "70rem" }}> */}
          {this.state.allbooks.map((eachBook) => {
            return (
              <React.Fragment>
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
                      <tr>
                        <td>
                          {" "}
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
                          {" "}
                          <Card.Title>:</Card.Title>
                        </td>
                        <Card.Title>₹{eachBook.price}</Card.Title>
                        <td> </td>
                      </tr>
                    </table>
                    {/* ************** */}
                    <Button
                      variant="outline-primary"
                      onClick={this.addToCart}
                      block
                      value={eachBook._id}
                    >
                      Add To Cart &nbsp;&nbsp;
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        class="bi bi-cart-plus"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                    </Button>
                  </Card.Body>
                </Card>
                &nbsp;&nbsp;&nbsp;
              </React.Fragment>
            );
          })}
          {/* {console.log(this.state.allbooks)} */}
        </Row>
      </React.Fragment>
    );
  }
}
export default Home;
