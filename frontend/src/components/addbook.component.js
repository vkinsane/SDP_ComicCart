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
        className="mt-5"
        style={{
          alignContent: "center",
          width: "50%",
          marginLeft: "25%",
          border: "1px solid black",
          borderRadius: "5px",
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
        <div class="alert alert-primary" role="alert">
          Add Book
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
          Add Book
        </button>
      </form>
    );
  }
}

export default Addbook;
