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
    //   .get(`https://sdp-comiccart-backend.onrender.com/user/indexHtml`)
    //   .then((res) => {
    //     // this.setState({ paymentForm: res });
    //     this.setState({ paymentForm: res.data });
    //   })
    //   .catch((res) => {
    //     console.debug("there was a error getting index.html page");
    //   });
  }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    // console.debug(this.state);
  };
  render() {
    // return <div dangerouslySetInnerHTML={{ __html: this.state.paymentForm }} />;
    return (
      <div className="row my-5">
        <div className="col-md-4 offset-md-4">
          <div className="card">
            <div className="card-body">
              <form
                className=""
                action="https://sdp-comiccart-backend.onrender.com/user/paynow"
                method="post"
              >
                <div className="form-group">
                  <label htmlFor="">Name: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={this.state.userData.fullName}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Email: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={this.state.userData.userEmail}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Phone: </label>
                  <input
                    className="form-control"
                    type="number"
                    // pattern="\d*"
                    // maxlength="10"
                    name="phone"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Amount: </label>
                  <input
                    className="form-control"
                    type="text"
                    name="amount"
                    // value={this.state.amount()}
                    value={localStorage.getItem("totalAmount")}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <button className="btn form-control btn-primary">
                    Pay Now
                  </button>
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
