import React, { Component } from "react";
import axios from "axios";
import { Alert, Form, Table, Button } from "react-bootstrap";
class Deletebook extends Component {
  state = {
    message: "",
    atype: "",
    // refreshTable: false,
    lengthOfdelArray: 0,
    allbooks: [],
    delArray: [],
    srNo: 0,
  };
  componentDidMount() {
    this.state.srNo = 0;
    axios
      .get(`http://localhost:8080/book/`)
      .then((res) => {
        this.setState({ allbooks: res.data });
      })
      .catch((errors) => {
        console.error(errors);
      });
  }
  handleChange = ({ target }) => {
    //taking element on which this method is applied, target is a keyword
    const { checked, value } = target;
    if (checked) {
      this.state.delArray.push(value);
    }
    if (!checked) {
      const element = this.state.delArray.indexOf(value);
      this.state.delArray.splice(element);
    }
    this.state.lengthOfdelArray = this.state.delArray.length;
    console.log(this.state.delArray);
  };
  delMultiple = () => {
    this.state.delArray.map((eachBookId) => {
      axios
        .delete(`http://localhost:8080/book/deleteBook/${eachBookId}`)
        .then((res) => {
          this.setState({
            message: "Book Deleted Successfully",
            atype: "success",
            delArray: [],
          });
          console.log(`Successfully deleted ${eachBookId}`);
          this.componentDidMount();
          //   console.log(this.state.allbooks.find({ bookName: "Book 2" }));
        })
        .catch((errors) => {
          //   console.error(errors);
          console.log("Failed to delete");
        });
    });
  };
  render() {
    return (
      <React.Fragment>
        <br />
        {this.state.atype && (
          <Alert variant={this.state.atype}>
            {this.state.lengthOfdelArray + " " + this.state.message}
          </Alert>
        )}
        <Button className="float-right" onClick={this.delMultiple}>
          Delete Multiple
        </Button>

        <br />
        <br />
        {/* <h6 className="float-right"></h6> */}
        <Table striped bordered hover variant="dark">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Sr. No.</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.allbooks.map((eachBook) => {
              this.state.srNo = this.state.srNo + 1;
              return (
                <tr>
                  <td>
                    <Form.Check
                      onChange={this.handleChange}
                      value={eachBook._id}
                    />
                  </td>
                  <td>{this.state.srNo}</td>
                  <td>{eachBook.bookName}</td>
                  <td>{eachBook.author}</td>
                  <td>{eachBook.price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}
export default Deletebook;
