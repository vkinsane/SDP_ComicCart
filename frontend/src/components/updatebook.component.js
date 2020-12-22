import React, { Component } from "react";
import axios from "axios";
import { Alert, Form, DropdownButton, Dropdown } from "react-bootstrap";
class Updatebook extends Component {
  state = {
    photo: "",
    bookName: "",
    author: "",
    price: "",
    tags: "",
    stock: "",
    link: "",
    showAlert: "",
    message: "",
    atype: "",
    formData: new FormData(),
    getBookDB: [],
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8080/book/`)
      .then((res) => {
        this.setState({ getBookDB: res.data });
      })
      .catch((errors) => {
        console.error(errors);
      });
  }
  //   handleChangePhoto = (name) => (event) => {
  //     const value = name === "photo" ? event.target.files[0] : event.target.value;
  //     this.state.formData.set(name, value);
  //     this.setState({ [name]: value });
  //   };
  handleChange = ({ target }) => {
    //taking element on which this method is applied, target is a keyword
    const { name, value } = target;
    this.state.formData.set(name, value);
    this.setState({ [name]: value });
    console.log(
      this.state.getBookDB.filter(
        (book) => book.bookName == this.state.bookName
      )[0]
    );
  };

  submit = (event) => {
    event.preventDefault();

    const payLoad = {
      bookName: this.state.bookName,
      author: this.state.author,
      price: this.state.price,
      tags: this.state.tags,
      stock: this.state.stock,
      link: this.state.link,
    };
    if (this.state.bookName != "") {
      axios({
        url: `http://localhost:8080/book/updateBook/${
          this.state.getBookDB.filter(
            (book) => book.bookName == this.state.bookName
          )[0]._id
        }`,
        method: "PUT", //check here put
        data: payLoad,
      })
        .then(() => {
          this.setState({
            showAlert: "true",
            message: "Book Data Updated Successfully",
            atype: "success",
          });
          console.log("Book Data Updated Successfully");
        })
        .catch(() => {
          this.setState({
            showAlert: "true",
            message: "Failed to Update Book Data",
            atype: "danger",
          });
          console.log("Internal Server error");
        });
    } else {
      this.setState({
        showAlert: true,
        atype: "warning",
        message: "Please select a book from dropdown",
      });
    }
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
          <Alert variant={this.state.atype} dismissible>
            {this.state.message}
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
        {/* <span>Update Book</span> */}
        <div class="alert alert-success" role="alert">
          Update Book
        </div>

        {/* <div className="form-group">
          <label className="btn btn-block btn-success">
            <input
              onChange={this.handleChangePhoto("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div> */}
        <div className="form-group">
          <Form.Control
            name="bookName"
            id="event-input"
            placeholder="Book Name"
            as="select"
            onChange={this.handleChange}
            custom
          >
            <option value="#">--Select Which book to be updated--</option>
            {this.state.getBookDB.map((opt) => (
              <option key={opt._id} value={opt.bookName}>
                {opt.bookName}
              </option>
            ))}
          </Form.Control>
        </div>
        <div className="form-group">
          <textarea
            onChange={this.handleChange}
            name="author"
            className="form-control"
            placeholder="Author"
            // placeholder={
            //   this.state.getBookDB.filter(
            //     (book) => book.bookName == this.state.bookName
            //   ).author
            // }
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
          Update Book Data
        </button>
      </form>
    );
  }
}

export default Updatebook;
