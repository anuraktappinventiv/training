const { Parser } = require("json2csv");
const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
let csv;
let userDetails = [];
let book = {};
let idCount = 1;

app.post(
  "/",
  (req, res) => {
    book = req.body;
    book.userId = idCount;
    ++idCount;
    userDetails.push(book);
    res.send(req.body);
    console.log(userDetails);
    
    last(userDetails);
  })


function last(book) {
  let fields = [
    "userId",
    "firstName",
    "lastName",
    "address",
    "pincode",
    "mobile"
  ];

  let parser = new Parser({
    fields,
    unwind: [
      "userId",
      "firstName",
      "lastName",
      "address",
      "pincode",
      "mobile"
    ]
  });

  csv = parser.parse(book);
  fs.writeFile("./test-data.csv", csv, err => {
    if (err) {
      console.log(err); // Do something to handle the error or just throw it
      throw new Error(err);
    }
    console.log("Success!");
  });
}

app.listen("3002", () => {
  console.log("started");
});