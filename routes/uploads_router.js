const express = require("express");
const router = express.Router();
const http = require("http");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

router.post("/receive", function (req, res, next) {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on("fileBegin", function (name, file) {
    file.path = __dirname + "/uploads/" + file.name;
  });

  let userEmail;

  form.on("field", function (field, value) {
    
    userEmail = value;
  });

  form.on("file", function (name, file) {

    // Step 1
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Step 2
    let mailOptions = {
      from: "kappkumar@gmail.com",
      to: userEmail,
      subject: "Call Log Report",
      text: "You'r requested report",
      attachments: [
        { filename: "Report.pdf", path: "./routes/uploads/Report.pdf" },
      ],
    };

    // Step 3
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
        res.send(err);
      } else {
        console.log("Email sent!!!");
        res.send("Report mailed successfully!!");
      }
    });
  });

  res.send(
    "Check your Inbox for the Report in a minute"
  );
});

module.exports = { router: router };
