import React, { Component } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

class Addbook extends Component {
  state = {
    photo: "",
    bookName: "",
    author: "",
    price: "",
    tags: "",
    stock: "",
    message: "",
    atype: "",
    showAlert: false,
    formData: new FormData(),
  };

  handleChangePhoto = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.state.formData.set(name, value);
    this.setState({ [name]: value });
  };
  handleChange = ({ target }) => {
    //taking element on which this method is applied, target is a keyword
    const { name, value } = target;
    this.state.formData.set(name, value);
    this.setState({ [name]: value });
    console.log(this.state.formData);
  };
  //   handleChangePhoto = ({ target }) => {
  //     //taking element on which this method is applied, target is a keyword
  //     const { name, value } = target.files[0];
  //     this.state.formData.set(name, value);
  //     this.setState({ [name]: value });
  //     console.log(this.state.formData);
  //   };

  submit = (event) => {
    event.preventDefault();

    // const payLoad = {
    //   photo: this.state.photo,
    //   bookName: this.state.bookName,
    //   author: this.state.author,
    //   price: this.state.price,
    //   tags: this.state.tags,
    //   stock: this.state.stock,
    // };

    axios({
      url: "http://localhost:8080/book/addbook",
      method: "POST",
      data: this.state.formData,
    })
      .then(() => {
        this.setState({
          showAlert: true,
          message: "Book Added Successfully",
          atype: "success",
        });
        // console.log("New Book Data has been sent to the server");
      })
      .catch(() => {
        this.setState({
          showAlert: true,
          message: "Failed to Add Book",
          atype: "danger",
        });
        console.log("Internal Server error");
      });
  };
  render() {
    return (
      <form
        className="shadow-lg bg-white mt-5"
        style={{
          alignContent: "center",
          width: "50%",
          marginLeft: "25%",
          border: "1px solid black",
          borderRadius: "0px",
        }}
      >
        {this.state.showAlert && (
          <Alert variant={this.state.atype}>
            {this.state.message}{" "}
            <button
              type="button"
              class="close"
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
        {/* <label className="btn btn-block btn-success">Add Book</label> */}
        <div
          class="alert alert-primary"
          role="alert"
          style={{
            // border: "1px solid black",
            borderRadius: "0px",
          }}
        >
          Add Book &nbsp;&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-journal-plus"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
            />
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
          </svg>
        </div>
        <div className="form-group">
          <label className="btn btn-block btn-secondary">
            <input
              onChange={this.handleChangePhoto("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="Choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleChange}
            name="bookName"
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={this.handleChange}
            name="author"
            className="form-control"
            placeholder="Author"
          />
        </div>
        <div className="form-group">
          <input
            onChange={this.handleChange}
            name="price"
            type="number"
            className="form-control"
            placeholder="Price"
          />
        </div>
        <div className="form-group">
          <input
            onChange={this.handleChange}
            name="tags"
            className="form-control"
            placeholder="Tags"
          />
        </div>
        <div className="form-group">
          <input
            onChange={this.handleChange}
            name="stock"
            type="number"
            className="form-control"
            placeholder="Stock"
          />
        </div>
        <div className="form-group">
          <input
            onChange={this.handleChange}
            name="link"
            type="text"
            className="form-control"
            placeholder="Enter book link here"
          />
        </div>

        <button
          type="submit"
          onClick={this.submit}
          className="btn btn-outline-primary py-2 mb-0 btn-block"
        >
          Add Book &nbsp;&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-clipboard-plus"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"
            />
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
          </svg>
        </button>
      </form>
    );
  }
}

export default Addbook;
