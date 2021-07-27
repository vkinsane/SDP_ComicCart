import React, { Component } from "react";
import axios from "axios";
import { Alert, Form } from "react-bootstrap";
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
      .get(`https://backend-api-comiccart.herokuapp.com/book/`)
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
    // Its not logging the book data at same time
    console.log(
      this.state.getBookDB.filter(
        (book) => book.bookName === this.state.bookName
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
    if (this.state.bookName !== "") {
      axios({
        url: `https://backend-api-comiccart.herokuapp.com/book/updateBook/${
          this.state.getBookDB.filter(
            (book) => book.bookName === this.state.bookName
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
        <div
          class="alert alert-primary"
          role="alert"
          style={{
            // border: "1px solid black",
            borderRadius: "0px",
          }}
        >
          Update Book &nbsp;&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-pencil-fill"
            viewBox="0 0 20 20"
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
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
          Update Book Data &nbsp;&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 20 20"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        </button>
      </form>
    );
  }
}

export default Updatebook;
