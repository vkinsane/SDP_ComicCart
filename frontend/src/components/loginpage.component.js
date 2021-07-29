import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  Form,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";

var messageGlobal = "";
var alertTypeGlobal = "";

export default class Login extends Component {
  state = {
    fname: "",
    lname: "",
    fullName: function () {
      return this.fname + " " + this.lname;
    },
    email: "",
    password: "",
    userRole: 0,
    alertType: "",
    message: "",
    redirect: false,
    userData: "",
    userId: "",
    userEmail: "",
  };
  afterLogoutAndRegistration() {
    var afterLogoutUrl = window.location.pathname;
    var indexOflogin = afterLogoutUrl.indexOf("login");

    if (
      afterLogoutUrl.substring(indexOflogin + 6, afterLogoutUrl.length) ===
      "loggedout"
    ) {
      messageGlobal = "Logged Out Successfully 👋";
      alertTypeGlobal = "info";
    }
    if (
      afterLogoutUrl.substring(indexOflogin + 6, afterLogoutUrl.length) ===
      "useradded"
    ) {
      messageGlobal = "User Added Successfully ✔";
      alertTypeGlobal = "info";
    }
    // console.log(afterLogoutUrl[indexOflogin + 6]);
  }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    console.log(this.state);
  };
  submit = (event) => {
    event.preventDefault();
    const payLoad = {
      email: this.state.email,
      password: this.state.password,
    };
    axios({
      url: "https://backend-api-comiccart.herokuapp.com/user/login",
      method: "POST",
      data: payLoad,
    })
      .then((res) => {
        this.setState({
          alertType: "success",
          //   message: res.data.message,
          message: "Login success",
          redirect: true,
          userId: res.data.userId,
          userEmail: res.data.userEmail,
          userData: res.data,
        });
        localStorage.setItem("userId", this.state.userId);
        localStorage.setItem("userEmail", this.state.userEmail);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userData", JSON.stringify(this.state.userData));

        // console.log(this.state);
      })
      .catch((res) => {
        this.setState({
          alertType: "danger",
          message: "Incorrect Email or Password",
        });
        console.log(res);
      });
  };
  render() {
    return (
      <Container
        className="my-3"
        // style={{ width: "35rem", border: "1px solid black" }}
        style={{
          width: "50%",
          // width: 1"45rem",
        }}
      >
        {this.afterLogoutAndRegistration()}
        {this.props && (
          <Alert variant={this.props.alertType}>{this.props.message}</Alert>
        )}
        {this.state.message && (
          <Alert variant={this.state.alertType}>{this.state.message}</Alert>
        )}
        {messageGlobal && (
          <Alert variant={alertTypeGlobal}>{messageGlobal}</Alert>
        )}
        <Form
          className="shadow-lg bg-white rounded"
          onSubmit={this.submit}
          style={{
            alignContent: "center",
            border: "1px solid black",
            borderRadius: "0px",
          }}
        >
          <div
            className="alert alert-primary"
            role="alert"
            style={{
              // border: "1px solid black",
              borderRadius: "0px",
            }}
          >
            Login
          </div>
          <Col className="px-4">
            <Form.Row as={Row} controlid="formBasicText">
              <Form.Label column sm="0">
                Email
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ex: sundarp12@gmail.com"
                  name="email"
                  onChange={this.handleChange}
                  required
                />
                {/* <InputGroup.Append>{this.state.emailPatternMsg}</InputGroup.Append> */}
              </InputGroup>
            </Form.Row>
            <Form.Row as={Row} controlid="formBasicPassword">
              <Form.Label column sm="0">
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="************"
                  name="password"
                  onChange={this.handleChange}
                  required
                />
              </InputGroup>

              {/* <Form.Row.Text id="inputGroupPrepend">@</Form.Row.Text> */}
            </Form.Row>
            <Button variant="primary" className="my-3" type="submit" block>
              Login &nbsp;&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-key-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </Button>
          </Col>
        </Form>
        {this.state.redirect && window.open("/", "_self")}
      </Container>
    );
  }
}
