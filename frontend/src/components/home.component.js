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
              bookAddedToCart: true,
              alertType: "success",
              message: "Book has been added to your cart 👍",
            });
          })
          .catch(() => {
            console.log("Internal Server error");
            this.setState({
              bookAddedToCart: false,
              alertType: "danger",
              message: "There was an error!",
            });
          });
      })
      .catch(() => {
        console.log("there was some error");
      });

    console.log(this.state.payload);
  };

  timer() {
    setTimeout(() => {
      this.setState({ bookAddedToCart: false, alertType: "", message: "" });
    }, 3000);
  }

  // updateCart = ({ target }) => {
  //   // event.preventDefault();
  //   const { value } = target;
  //   axios({
  //     url: `http://localhost:8080/user/updateusercart/5fa38132b18f8233d81c6a4b`,
  //     method: "PUT", //check here put
  //     data: { cart: this.state.payload },
  //   })
  //     .then(() => {
  //       console.log("Successful");
  //     })
  //     .catch(() => {
  //       console.log("Internal Server error");
  //     });
  // };

  render() {
    return (
      <React.Fragment>
        {/* <Button variant="primary" onClick={this.updateCart} block>
          Update Cart
        </Button> */}
        {!this.timer() && this.state.bookAddedToCart && (
          <Alert variant={this.state.alertType} dismissible>
            {this.state.message}
          </Alert>
        )}
        {this.state.id && (
          <Alert variant="success" dismissible>
            "worked"
          </Alert>
        )}
        <Row>
          {/* <CardDeck style={{ width: "70rem" }}> */}
          {this.state.allbooks.map((eachBook) => {
            return (
              <React.Fragment>
                <Card border="secondary" style={{ width: "20rem" }}>
                  <ImageHelper book={eachBook} />
                  <Card.Header>
                    <h4>{eachBook.bookName}</h4>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Author : {eachBook.author}</Card.Title>
                    <Card.Title>Price : ₹{eachBook.price}</Card.Title>
                    <Card.Text>
                      {eachBook.description}
                      {/* show price(on a button) ,tags,stock */}
                      {/* Description is to be added here */}
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      onClick={this.addToCart}
                      block
                      value={eachBook._id}
                    >
                      Add To Cart
                    </Button>
                  </Card.Body>
                </Card>
                &nbsp;&nbsp;&nbsp;
              </React.Fragment>
            );
          })}
          {/* {console.log(this.state.allbooks)} */}
        </Row>

        {/* </CardDeck> */}
      </React.Fragment>
    );
  }
}
export default Home;
