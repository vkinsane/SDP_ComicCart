import React, { Component } from "react";
import { Alert, Button, Card, Row } from "react-bootstrap";
// import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import axios from "axios";
import ImageHelper from "./imagehelper.component";
// import imageurl from "../../src/assets/images/cardimage.webp";
var key = 0;
class Home extends Component {
  state = {
    scrWidth: window.innerWidth,
    allbooks: [],
    imageurl: "",
    cartArray: [],
    payload: [],
    bookAddedToCart: "",
    alertType: "",
    message: "",
  };

  componentDidMount() {
    //get element width

    axios
      .get(`https://sdp-comiccart-backend.onrender.com/book/`)
      .then((res) => {
        this.setState({ allbooks: res.data });
      })
      .catch((errors) => {
        console.error(errors);
      });

    if (localStorage.getItem("userId")) {
      axios
        .get(
          `https://sdp-comiccart-backend.onrender.com/user/getuser/${localStorage.getItem(
            "userId"
          )}`
        )
        .then((res) => {
          this.setState({ payload: res.data.cart });
        })
        .catch((errors) => {
          console.debug(errors);
        });
    }
  }

  addToCart = ({ target }) => {
    const { name, value } = target;
    // this.state.payload.push(value);
    if (localStorage.getItem("isLoggedIn")) {
      axios
        .get(`https://sdp-comiccart-backend.onrender.com/book/${value}`)
        .then((res) => {
          this.state.payload.push(res.data);
          axios({
            url: `https://sdp-comiccart-backend.onrender.com/user/updateusercart/${localStorage.getItem(
              "userId"
            )}`,
            method: "PUT", //check here put
            data: { cart: this.state.payload },
          })
            .then(() => {
              console.debug("Successful");
              // this.setState({ bookAddedToCart: true });
              this.setState({
                showAlert: true,
                alertType: "success",
                message: `"${name}" comic book has been added to your cart 👍`,
              });
            })
            .catch(() => {
              console.debug("Internal Server error");
              this.setState({
                showAlert: true,
                alertType: "danger",
                message: "There was an error!",
              });
            });
        })
        .catch(() => {
          console.debug("there was some error");
        });

      console.debug(this.state.payload);
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
        {this.state.showAlert && (
          <Alert variant={this.state.alertType}>
            {this.state.message}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                this.setState({
                  showAlert: false,
                });
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Alert>
        )}
        <Row
          className="m-auto"
          style={{
            width: this.state.scrWidth < 693 ? "min-content" : "",
          }}
        >
          {/* <CardDeck style={{ width: "70rem" }}> */}
          {this.state.allbooks.map((eachBook) => {
            return (
              <React.Fragment key={++key}>
                <Card
                  className="shadow bg-white rounded mb-3 ml-lg-4"
                  border="secondary"
                  // style={{ width: "20rem", }}
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
                    {/* ************** */}
                    <Button
                      variant="outline-primary"
                      onClick={this.addToCart}
                      block
                      value={eachBook._id}
                      name={eachBook.bookName}
                    >
                      Add To Cart &nbsp;&nbsp;
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-cart-plus"
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
          {/* {console.debug(this.state.allbooks)} */}
        </Row>
      </React.Fragment>
    );
  }
}
export default Home;
