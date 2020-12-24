// var PaytmConfig = {
//   mid: "Kkatvd34334425459416",
//   key: "fgkmv_RHsi6R@QXm",
//   website: "WEBSTAGING",
// };
// My Api key
// var PaytmConfig = {
//   mid: "qaORZA66185274500972",
//   key: "E3kASmcoVYgmiQas",
//   website: "WEBSTAGING",
// };
require("dotenv").config();
var PaytmConfig = {
  mid: process.env.TEST_MERCH_ID,
  key: process.env.TEST_MERCH_KEY,
  website: process.env.WEBSITE,
};
module.exports.PaytmConfig = PaytmConfig;
