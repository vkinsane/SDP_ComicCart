import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
// this below import is neccessary for working of the React-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import dummyimg from "./assets/images/img-deathnote.jpg";
import { Carousel, Nav, Form, Button, Navbar, Alert } from "react-bootstrap";
import "./App.css";
import Home from "./components/home.component";
import Addbook from "./components/addbook.component";
import Updatebook from "./components/updatebook.component";
import Deletebook from "./components/delete.component";
import Cart from "./components/cart.component";
import AddUser from "./components/adduser.component";
import Login from "./components/loginpage.component";
import Admindashboard from "./components/admindashboard.component";
import Dashboard from "./components/dashboard.component";
import Paymentpage from "./components/paymentpage.component";
import Helper from "./helper_methods/helper";
var userName = {};
export default class App extends Component {
  state = {
    // userName: "",
    logout: false,
    logoutBtnVisible: localStorage.getItem("isLoggedIn"),
    userIsAdmin: JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).role === 1
      : false,
    // showAdminRoutes: localStorage.getItem("isLoggedIn"),
    url: window.location.pathname !== "http://localhost:3000/cart",
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
        // this.state.userIsAdmin = true;
        this.setState({ userIsAdmin: true });
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
      userName = JSON.parse(localStorage.getItem("userData"));
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
      <React.Fragment>
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
                <Nav.Link href="/dashboard">My Books</Nav.Link>

                {/* Show admin links */}
                {/* Helper Component to check whether user is admin or not */}

                <Helper />
              </Nav>
              <Form inline>
                {this.state.logoutBtnVisible && (
                  <React.Fragment>
                    <Alert variant="primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                        <path
                          fillRule="evenodd"
                          d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                        />
                      </svg>
                      &nbsp;&nbsp;
                      {userName.fullName}
                      &nbsp;&nbsp;&nbsp;
                      <Button variant="danger" onClick={this.logout}>
                        Logout
                      </Button>
                    </Alert>
                  </React.Fragment>
                )}
                {/* if user clicks on logout then redirect him to /login route */}
                {this.state.logout && <Redirect to="/login/loggedout" />}
                &nbsp;&nbsp;&nbsp;
                {/* <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-info">Search</Button> */}
              </Form>
            </Navbar>
            {/* <Route path="/" exact render={() => landingPage()} />{" "} */}
            {/* <Route path="/" exact render={() => <h1>Hello World</h1>} />{" "} */}
            <Route path="/" exact render={() => <Home />} />{" "}
            <Route path="/login" render={() => <Login />} />
            <Route path="/register" exact render={() => <AddUser />} />
            {this.showPrivateRoutes() ? (
              <React.Fragment>
                <Route path="/cart" render={() => <Cart />} />
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
                <Route
                  path="/admindashboard"
                  exact
                  render={() => <Admindashboard />}
                />
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

        <footer className="footer mt-auto py-3 text-light bg-dark">
          <div className="container">
            <span className="">
              ComicCart &#169; 2020-21 | For any queries please contact on{" "}
              <a href="https://vishal-khandate.netlify.app/">
                vishal.khandate19@vit.edu
              </a>
            </span>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
