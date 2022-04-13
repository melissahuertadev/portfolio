const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const app = express();

const PORT = process.env.PORT || 5000;

//env variables
require("dotenv").config();

const path = require("path");

//Middleware
app.use(express.static("public"));
app.use("/files", express.static(__dirname + "public/files"));

//enable applications on different hosts
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

//nodemailer config
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify(function (err, sucs) {
  if (err) {
    console.log(err);
  } else {
    console.log("Ready for messages");
    console.log(sucs);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post(
  "/sendmail",
  body("name", "Name cannot be blank").notEmpty(),
  body("email").isEmail(),
  body("message").notEmpty(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.redirect("/#contact");
    }

    const { email, message } = req.body;

    const mailOptions = {
      from: email,
      to: process.env.AUTH_EMAIL,
      subject: "I want to work with you",
      text: message,
    };

    transporter
      .sendMail(mailOptions)
      .then(() => {
        
        res.sendFile(path.join(__dirname, "./public/success.html"));
      })
      .catch((err) => {
        res.json({ status: "FAILED", message: "An error occurred" });
      });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});