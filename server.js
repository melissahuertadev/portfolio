const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult, sanitizeBody } = require("express-validator");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

//env variables
require("dotenv").config();

const path = require("path");

//Middleware
app.use(express.static("public"));
app.use("/files", express.static(__dirname + "public/files"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Enable applications on different hosts
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

/******************* Mongoose *******************/
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Project = require("./models/Project");
const Category = require("./models/Category");
const Technology = require("./models/Technology");

/******************* Routes *******************/
app.get("/", (req, res) => {
  Project.find({ $ne: null }, function (err, foundProjects){
    if (err) {
      console.log(err);
    } else {
      if (foundProjects.length > 0) {
        res.render("index", { projects: foundProjects });
      } else {
        res.render("index", { projects: []});
      }
    }
  });
});

//Render single project page
app.get("/p/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate('category').populate('technologies');

    if(!project){
      res.render("404");
    } else {
      res.render("project", { project });
    }

  } catch(err){
    console.log(err);
  }
});

/******************* Nodemailer *******************/
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

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
      .then((result) => res.render("success"))
      .catch((error) => {
        res.json({ status: "FAILED", message: "An error occurred" });
    });
  }
);

/******************* 404 *******************/
app.get("*", (req, res) => {
  res.render("404");
});

/*************** Starting Server ***************/
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});