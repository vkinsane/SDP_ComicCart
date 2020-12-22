import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
// this below import is neccessary for working of the React-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import dummyimg from "./assets/images/img-deathnote.jpg";
import {
  Carousel,
  Nav,
  FormControl,
  Form,
  Button,
  Navbar,
} from "react-bootstrap";
import "./App.css";
import Home from "./components/home.component";
import Addbook from "./components/addbook.component";
import Updatebook from "./components/updatebook.component";
import Deletebook from "./components/delete.component";
import Cart from "./components/cart.component";
import AddUser from "./components/adduser.component";
import Login from "./components/loginpage.component";
import Dashboard from "./components/dashboard.component";
import Paymentpage from "./components/paymentpage.component";
import Navrouter from "./components/navbar_routing.component";
import Helper from "./helper_methods/helper";

export default class App extends Component {
  state = {
    logout: false,
    logoutBtnVisible: localStorage.getItem("isLoggedIn"),
    userIsAdmin: JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).role === 1
      : false,
    // showAdminRoutes: localStorage.getItem("isLoggedIn"),
  };
  componentDidMount() {
    this.setState({
      userIsAdmin: JSON.parse(localStorage.getItem("userData"))
        ? JSON.parse(localStorage.getItem("userData")).role === 1
        : false,
    });
  }
  showAdminRoutes() {
    if (this.showPrivateRoutes()) {
      if (JSON.parse(localStorage.getItem("userData")).role === 1) {
        // return JSON.parse(localStorage.getItem("userData"));
        // console.log("this user is admin");
        this.state.userIsAdmin = true;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  showPrivateRoutes() {
    if (localStorage.getItem("isLoggedIn")) {
      return JSON.parse(localStorage.getItem("isLoggedIn"));
    } else {
      return false;
    }
  }
  landingPage = () => {
    return (
      <div className="">
        <Carousel
          style={{ width: "50rem", verticalAlign: "", alignItems: "center" }}
        >
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src={dummyimg}
              alt="First slide"
              // style={{ height: "35rem", maxWidth: "75rem" }}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src={dummyimg}
              alt="Second slide"
              // style={{ height: "35rem", maxWidth: "75rem" }}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  };
  logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    this.setState({
      logout: true,
      logoutBtnVisible: localStorage.getItem("isLoggedIn"),
      userIsAdmin: JSON.parse(localStorage.getItem("userData"))
        ? JSON.parse(localStorage.getItem("userData")).role === 1
        : false,
    });

    // console.log(this.state);
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar bg="dark" variant="dark" className="sticky-top">
            <Navbar.Brand href="/">ComicCart</Navbar.Brand>
            <Nav className="mr-auto">
              {/* <Nav.Link href="/home">Home</Nav.Link> */}
              {!localStorage.getItem("isLoggedIn") && (
                <React.Fragment>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </React.Fragment>
              )}
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              {/* Show admin links */}
              {/* Helper Component to check whether user is admin or not */}
              <Helper />
            </Nav>
            <Form inline>
              {this.state.logoutBtnVisible && (
                <Button variant="outline-danger" onClick={this.logout}>
                  Logout
                </Button>
              )}
              {/* if user clicks on logout then redirect him to /login route */}
              {this.state.logout && <Redirect to="/login/loggedout" />}
              &nbsp;&nbsp;&nbsp;
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
          {/* <Route path="/" exact render={() => landingPage()} />{" "} */}
          {/* <Route path="/" exact render={() => <h1>Hello World</h1>} />{" "} */}
          <Route path="/" exact render={() => <Home />} />{" "}
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" exact render={() => <AddUser />} />
          {this.showPrivateRoutes() ? (
            <React.Fragment>
              <Route path="/cart" exact render={() => <Cart />} />
              <Route path="/dashboard" render={() => <Dashboard />} />
              <Route path="/payment" render={() => <Paymentpage />} />
            </React.Fragment>
          ) : (
            <Route
              path={["/cart", "/dashboard", "/payment"]}
              exact
              render={() => (
                <Login
                  message={"Please Login to access this route 🗝"}
                  alertType={"warning"}
                />
              )}
            />
          )}
          {/* Admin routes */}
          {this.state.userIsAdmin ? (
            <React.Fragment>
              <Route path="/addbook" exact render={() => <Addbook />} />
              <Route path="/updatebook" exact render={() => <Updatebook />} />
              <Route path="/deletebook" exact render={() => <Deletebook />} />
            </React.Fragment>
          ) : (
            <Route
              path={["/addbook", "/updatebook", "/deletebook"]}
              exact
              render={() => (
                <Login
                  message={"You are not an admin to acces to this route"}
                  alertType={"info"}
                />
              )}
            />
          )}
        </Router>
      </div>
    );
  }
}
