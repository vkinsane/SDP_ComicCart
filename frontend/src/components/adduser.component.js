import React, { Component } from "react";
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
import { Redirect } from "react-router-dom";
export default class AddUser extends Component {
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
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    console.log(this.state);
  };
  submit = (event) => {
    event.preventDefault();
    const payLoad = {
      firstName: this.state.fname,
      lastName: this.state.lname,
      // fullName: this.state.fullName(),
      email: this.state.email,
      password: this.state.password,
      role: this.state.userRole,
    };
    axios({
      url: "http://localhost:8080/user/adduser",
      method: "POST",
      data: payLoad,
    })
      .then((res) => {
        this.setState({
          alertType: "success",
          message: res.data.message,
          redirect: true,
          // message: "Successfully added user",
        });
        console.log(res);
      })
      .catch((res) => {
        this.setState({
          alertType: "danger",
          message: "There was some problem!",
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
          // width: "35rem",
          width: "50%",
        }}
      >
        <Alert variant={this.state.alertType}>{this.state.message}</Alert>
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
            Register
          </div>
          <Col className="px-4">
            <Form.Row as={Row} controlid="formBasicText">
              <Form.Label column sm="0">
                First&nbsp;Name
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ex: Sundar"
                  name="fname"
                  onChange={this.handleChange}
                  required
                />
                {/* <InputGroup.Append>gg</InputGroup.Append> */}
              </InputGroup>
            </Form.Row>
            <Form.Row as={Row} controlid="formBasicText">
              <Form.Label column sm="0">
                Last&nbsp;Name
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ex: Pichai"
                  name="lname"
                  onChange={this.handleChange}
                  required
                />
                {/* <InputGroup.Append>{this.state.lnamePatternMsg}</InputGroup.Append> */}
              </InputGroup>
            </Form.Row>
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
                {/* <InputGroup.Append>
              {this.state.passwordPatternMsg}
            </InputGroup.Append> */}
              </InputGroup>

              {/* <Form.Row.Text id="inputGroupPrepend">@</Form.Row.Text> */}
            </Form.Row>
            <Button variant="primary" className="my-3" type="submit" block>
              Register &nbsp;&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-person-plus-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path
                  fillRule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>
            </Button>
          </Col>
        </Form>
        {this.state.redirect && <Redirect to="/login/useradded" />}
      </Container>
    );
  }
}
