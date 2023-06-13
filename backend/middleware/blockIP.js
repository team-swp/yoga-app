const axios = require("axios");
// const ipify = require("ipify2");
// const ipify = require("ipify");
module.exports.getUserIP = async function(req, res, next) {
  try {
    const response = await axios.get('https://api64.ipify.org?format=json');
    res.send(response.data);
    console.log(response.data);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// module.exports.getUserIP = async function (req, res, next) {
//   try {
//     ipify
//       .ipv4()
//       .then((ipv4) => {
//         res.send({ip:ipv4});
//       })
//       .catch((err) => {
//         res.status(500).send("Cannot get IP");
//       });
//   } catch (error) {
//     // Handle error
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };
// module.exports.getUserIP = async function (req, res, next) {
//   try {
//    const ipv4 = await ipify({useIPv6: false})
//         res.send({ip:ipv4});
//   } catch (error) {
//     // Handle error
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };
