import React, { Component } from "react";
// import axios from "axios";

class Paymentpage extends Component {
  state = {
    paymentForm: "hello world",
    userData: JSON.parse(localStorage.getItem("userData")),
    amount: function () {
      var pageUrl = window.location.pathname;
      var indexOfPayment = pageUrl.indexOf("payment");
      var amount = pageUrl.substring(indexOfPayment + 8, pageUrl.length);
      return amount;
    },
    phone: "7777777777",
    payload: {
      amount: 10,
      name: "Vk",
      email: "xyz@gmail.com",
      phone: "7777777777",
      userData: JSON.parse(localStorage.getItem("userData")),
    },
  };
  componentDidMount() {
    // axios
    //   .get(`http://localhost:8080/user/indexHtml`)
    //   .then((res) => {
    //     // this.setState({ paymentForm: res });
    //     this.setState({ paymentForm: res.data });
    //   })
    //   .catch((res) => {
    //     console.log("there was a error getting index.html page");
    //   });
  }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    // console.log(this.state);
  };
  render() {
    // return <div dangerouslySetInnerHTML={{ __html: this.state.paymentForm }} />;
    return (
      <div class="row my-5">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <div class="card-body">
              <form
                class=""
                action="http://localhost:8080/user/paynow"
                method="post"
              >
                <div class="form-group">
                  <label for="">Name: </label>
                  <input
                    class="form-control"
                    type="text"
                    name="name"
                    value={this.state.userData.fullName}
                  />
                </div>
                <div class="form-group">
                  <label for="">Email: </label>
                  <input
                    class="form-control"
                    type="text"
                    name="email"
                    value={this.state.userData.userEmail}
                  />
                </div>
                <div class="form-group">
                  <label for="">Phone: </label>
                  <input
                    class="form-control"
                    type="number"
                    // pattern="\d*"
                    // maxlength="10"
                    name="phone"
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label for="">Amount: </label>
                  <input
                    class="form-control"
                    type="text"
                    name="amount"
                    // value={this.state.amount()}
                    value={localStorage.getItem("totalAmount")}
                  />
                </div>
                <div class="form-group">
                  <button class="btn form-control btn-primary">Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Paymentpage;
