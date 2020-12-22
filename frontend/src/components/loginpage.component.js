import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
      afterLogoutUrl.substring(indexOflogin + 6, afterLogoutUrl.length) ==
      "loggedout"
    ) {
      this.state.message = "Logged Out Successfully 👋";
      this.state.alertType = "info";
    }
    if (
      afterLogoutUrl.substring(indexOflogin + 6, afterLogoutUrl.length) ==
      "useradded"
    ) {
      this.state.message = "User Added Successfully ✔";
      this.state.alertType = "info";
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
      url: "http://localhost:8080/user/login",
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
        style={{ width: "35rem" }}
      >
        {this.afterLogoutAndRegistration()}
        {this.props && (
          <Alert variant={this.props.alertType}>{this.props.message}</Alert>
        )}
        <Alert variant={this.state.alertType}>{this.state.message}</Alert>
        <Form onSubmit={this.submit}>
          <Form.Row as={Row} controlId="formBasicText">
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
          <Form.Row as={Row} controlId="formBasicPassword">
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
              {/* <InputGroup.Append>
              {this.state.passwordPatternMsg}
            </InputGroup.Append> */}
            </InputGroup>

            {/* <Form.Row.Text id="inputGroupPrepend">@</Form.Row.Text> */}
          </Form.Row>
          <Button variant="primary" className="my-3" type="submit" block>
            Login
          </Button>
        </Form>
        {this.state.redirect && (window.open("/", "_self"), window.close())}
      </Container>
    );
  }
}
