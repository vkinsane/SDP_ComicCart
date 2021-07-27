const express = require("express");
const router = express.Router();
const fs = require("fs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const formidable = require("formidable");
const user = require("../models/user_model");
// const index = require("./index.html");
router.get("/getusers", (req, res) => {
  user
    .find()
    .then((usersData) => res.json(usersData))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/getuser/:userId", (req, res) => {
  user
    .findById({ _id: req.params.userId })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/login", (req, res) => {
  // if else also not woking here
  // if (user.findOne({ email: req.body.email }) != null) {
  //   res.json("User found");
  // } else {
  //   res.json("User Not Found");
  // }
  // **it is founding any email
  user.findOne({ email: req.body.email }).then((user) => {
    if (user == null) {
      res
        .header({ message: "User Not found" })
        .status(400)
        .json("User not found");
    } else {
      // res.status(200).json(user);
      if (req.body.password == user.password) {
        // res.header({ userId: user._id });
        res.status(200).json({
          fullName: user.firstName + " " + user.lastName,
          message: "Login Successful",
          userId: user._id,
          userEmail: user.email,
          role: user.role,
        });
      } else {
        res.status(400).json("Incorrect Password");
      }
    }
  });
  // function is not going till catch for ever case only then is working therefore inside then if and else used
  // .catch((err) => res.status(400).json("Email Doesn't Exists " + err));
});

router.post("/adduser", (req, res) => {
  // if (user.find({ email: req.body.email })) {
  //   return res.status(400).json("USer Exists already");
  // }
  const newuserdata = new user({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  newuserdata.save((err, newuserdata) => {
    // err coming from email : unique = true <=user_model.js
    if (err) {
      return res
        .status(400)
        .json({ message: "User already exists with same email" });
    }

    res.status(200).json({ message: "User Added Successfully" });
  });
});

router.delete("/deleteuser/:userId", (req, res) => {
  user.findById({ _id: req.params.userId }).remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the book",
      });
    }
    res.json({
      message: "User was deleted successfully",
      deletedUser,
    });
  });
});
// updating cart
router.put("/updateusercart/:userId", (req, res) => {
  // const userUpdateData = new user({
  //   _id: req.params.userId,
  //   cart: req.body.cart,
  // });
  user
    .findById({ _id: req.params.userId })
    .update({ cart: req.body.cart })
    // .updateOne({ _id: req.params.userId }, userUpdateData)
    .then(() => {
      res.json(`Successfully updated user cart`);
    })
    .catch((err) => {
      res.json(err);
    });
});
// updating purchased books
router.put("/updatepurchasedbooks/:userId", (req, res) => {
  // const userUpdateData2 = new user({
  //   _id: req.params.userId,
  //   purchasedBooks: req.body.purchasedBooks,
  //   // cart: ["123"],
  // });
  user
    .findById({ _id: req.params.userId })
    .update({ purchasedBooks: req.body.purchasedBooks })
    .then(() => {
      res.json(`Successfully updated users purchasedBooks`);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/sendmail", (req, res) => {
  const msg = {
    to: req.body.email, // Change to your recipient
    from: "vishukblog000@gmail.com", // Change to your verified sender
    subject: "ComicCArt Email through sendgrid API",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      res.json({
        message: "Mail Sent",
      });
      console.log("Email sent");
    })
    .catch((error) => {
      res.json("Mail Not sent There was some problem");
      console.error(error);
    });
});

// for paytm****
const https = require("https");
const qs = require("querystring");

const checksum_lib = require("../Paytm/checksum");
const config = require("../Paytm/config");

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

router.get("/indexHtml", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  res.sendFile(__dirname + "/index.html");
});
router.post("/paynow", [parseUrl, parseJson], (req, res) => {
  // Route for making payment

  var paymentDetails = {
    amount: req.body.amount,
    customerId: req.body.name,
    customerEmail: req.body.email,
    customerPhone: req.body.phone,
  };
  if (
    !paymentDetails.amount ||
    !paymentDetails.customerId ||
    !paymentDetails.customerEmail ||
    !paymentDetails.customerPhone
  ) {
    res.status(400).send("Payment failed");
  } else {
    var params = {};
    params["MID"] = config.PaytmConfig.mid;
    params["WEBSITE"] = config.PaytmConfig.website;
    params["CHANNEL_ID"] = "WEB";
    params["INDUSTRY_TYPE_ID"] = "Retail";
    params["ORDER_ID"] = "TEST_" + new Date().getTime();
    // params["CUST_ID"] = paymentDetails.customerId;
    params["CUST_ID"] = "Customer001";
    params["TXN_AMOUNT"] = paymentDetails.amount;
    params["CALLBACK_URL"] =
      "https://backend-api-comiccart.herokuapp.com/user/callback";
    params["EMAIL"] = paymentDetails.customerEmail;
    params["MOBILE_NO"] = paymentDetails.customerPhone;

    checksum_lib.genchecksum(
      params,
      config.PaytmConfig.key,
      function (err, checksum) {
        var txn_url =
          "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
        // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

        var form_fields = "";
        for (var x in params) {
          form_fields +=
            "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
        }
        form_fields +=
          "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(
          '<html><head><title>Merchant Checkout Page</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous" /><link rel="icon" href="./paytm.svg" type="image/x-icon" /></head><body><div className="text-center"><h1>Please do not refresh this page...</h1><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div><form method="post" action="' +
            txn_url +
            '" name="f1">' +
            form_fields +
            '</form></div><script type="text/javascript">document.f1.submit();</script></body></html>'
        );
        res.end();
      }
    );
  }
});
router.post("/callback", (req, res) => {
  // Route for verifiying payment

  var body = "";

  req.on("data", function (data) {
    body += data;
  });

  req.on("end", function () {
    var html = "";
    var post_data = qs.parse(body);

    // received params in callback
    console.log("Callback Response: ", post_data, "\n");

    // verify the checksum
    var checksumhash = post_data.CHECKSUMHASH;
    // delete post_data.CHECKSUMHASH;
    var result = checksum_lib.verifychecksum(
      post_data,
      config.PaytmConfig.key,
      checksumhash
    );
    console.log("Checksum Result => ", result, "\n");

    // Send Server-to-Server request to verify Order Status
    var params = { MID: config.PaytmConfig.mid, ORDERID: post_data.ORDERID };

    checksum_lib.genchecksum(
      params,
      config.PaytmConfig.key,
      function (err, checksum) {
        params.CHECKSUMHASH = checksum;
        post_data = "JsonData=" + JSON.stringify(params);

        var options = {
          hostname: "securegw-stage.paytm.in", // for staging
          // hostname: 'securegw.paytm.in', // for production
          port: 443,
          path: "/merchant-status/getTxnStatus",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": post_data.length,
          },
        };

        // Set up the request
        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("S2S Response: ", response, "\n");

            var _result = JSON.parse(response);
            if (_result.STATUS == "TXN_SUCCESS") {
              res.sendFile("./paymentsuccess.html", { root: __dirname });
            } else {
              res.sendFile("./paymentfailure.html", { root: __dirname });
              // res.send("payment failed");
            }
          });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
      }
    );
  });
});

// ****
module.exports = router;
