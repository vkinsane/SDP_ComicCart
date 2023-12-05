import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Nav, FormControl, Form, Button, Navbar } from "react-bootstrap";
import "../App.css";
import Home from "./home.component";
import Addbook from "./addbook.component";
import Updatebook from "./updatebook.component";
import Deletebook from "./delete.component";
import Cart from "./cart.component";
import AddUser from "./adduser.component";
import Login from "./loginpage.component";
import Dashboard from "./dashboard.component";
export default class Navrouter extends Component {
  state = {
    logout: false,
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
        // console.debug("this user is admin");
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
  logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    this.setState({
      logout: true,
      userIsAdmin: JSON.parse(localStorage.getItem("userData"))
        ? JSON.parse(localStorage.getItem("userData")).role === 1
        : false,
    });

    // console.debug(this.state);
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar bg="dark" variant="dark" className="sticky-top">
            <Navbar.Brand href="/home">ComicCart</Navbar.Brand>
            <Nav className="mr-auto">
              {/* <Nav.Link href="/home">Home</Nav.Link> */}
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>

              {this.state.userIsAdmin && (
                <React.Fragment>
                  <Nav.Link href="/addbook">Add Book</Nav.Link>
                  <Nav.Link href="/updatebook">Update Book</Nav.Link>
                  <Nav.Link href="/deletebook">Delete Book</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
            <Form inline>
              <Button variant="outline-danger" onClick={this.logout}>
                Logout
              </Button>
              {/* if user clicks on logout then redirect him to / route */}
              {this.state.logout && <Redirect to="/register" />}
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
          <Route path="/home" exact render={() => <Home />} />{" "}
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/register" exact render={() => <AddUser />} />
          {/* <Route path="/cart" exact render={() => <Cart />} /> */}
          {/* Dashboard Component is not made yet */}
          {this.showPrivateRoutes() ? (
            <React.Fragment>
              <Route path="/cart" exact render={() => <Cart />} />
              <Route path="/dashboard" exact render={() => <Dashboard />} />
            </React.Fragment>
          ) : (
            <Route
              path={["/cart", "/dashboard"]}
              exact
              render={() => (
                <Login
                  message={"Please Login to access this route 🗝 "}
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
