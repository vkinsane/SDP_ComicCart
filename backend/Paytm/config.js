require("dotenv").config();
var PaytmConfig = {
  mid: process.env.TEST_MERCH_ID,
  key: process.env.TEST_MERCH_KEY,
  website: process.env.WEBSITE,
};
module.exports.PaytmConfig = PaytmConfig;
