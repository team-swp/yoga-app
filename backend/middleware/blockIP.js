const axios = require("axios");
const fs = require("fs");
const dataFilePath = "data.json";

module.exports.getUserIP = async function (req, res, next) {
  try {
    let count = 0;
    const response = await axios.get("https://api64.ipify.org?format=json");

    // Load the data from the file if it exists
    let data = { blacklist: [] };
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, "utf8");
      data = JSON.parse(fileContent);
    }

    const { blacklist } = data;
    data.blacklist.push(response.data);

    blacklist.map((blackItem) => {
      if (blackItem.ip === response.data.ip) {
        count = count + 1;
      }
    });
    console.log(count);
    if (count >= 5) {
      res.status(401).json({ error: "Your IP was blocked" });
      fs.writeFileSync(dataFilePath, JSON.stringify(data), "utf8");
      // fs.writeFileSync(dataFilePath, JSON.stringify({blacklist:[]}), "utf8");
      return;
    }

    // Update the data in the file
    fs.writeFileSync(dataFilePath, JSON.stringify(data), "utf8");

    res.send(response.data);
    next();
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
