const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult, sanitizeBody } = require("express-validator");

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
const { google } = require("googleapis");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post(
  "/sendmail",
  body("name", "Name cannot be blank").notEmpty(),
  body("email").isEmail(),
  body("message").notEmpty(),
  (req, res) => {
    //Nodemailer + Gmail
    const OAuth2_client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    OAuth2_client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    async function send() {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.redirect("/#contact");
        }

        const accessToken = await OAuth2_client.getAccessToken();

        const { name, email, message } = req.body;
        const contentHtml = `
            <h1>I want to work with you!</h1>
            <ul>
              <li>Name: ${name}</li>
              <li>E-mail: ${email}</li>
            </ul>
            <p>Message: ${message}</p>
            `;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.AUTH_EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
          },
        });

        const mailOptions = {
          from: name,
          to: process.env.AUTH_EMAIL,
          subject: "I want to work with you",
          html: contentHtml,
        };

        const result = await transporter.sendMail(mailOptions);

        return result;
      } catch (error) {
        console.log(error);
      }
    }

    send()
      .then((result) => res.sendFile(path.join(__dirname, "./public/success.html")))
      .catch((error) => {
        console.log(error.message);
        res.json({ status: "FAILED", message: "An error occurred" });
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
