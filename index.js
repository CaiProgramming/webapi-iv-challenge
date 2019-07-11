const express = require("express");
const app = express();
const bodyParser = require("body-parser").json();
const port = process.env.PORT || 3000;
const axios = require("axios");
let server = app.listen(port);

console.log(`Runnng on port ${port}`);

app.post("/api/fuckoff", bodyParser, async (req, res) => {
  if (!req.body.params) {
    const data = await axios
      .get("https://www.foaas.com/operations")
      .then(data => {
        let response = data.data;
        response.unshift(
          "send the operation you wanna do as params into the body like /foo/:bar etc..."
        );
        return response;
      })
      .catch(error => {
        return error;
      });
    return res.json(data);
  }
  const data = await axios
    .get(`https://www.foaas.com${req.body.params}`)
    .then(data => {
      return data.data;
    })
    .catch(error => {
      return error;
    });
  return res.json(data);
});
