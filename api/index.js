const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const multer = require("multer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "media_manager",
});

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

var filename = "";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    filename = file.originalname.replace(/ /g, "_");
    cb(null, filename);
  },
});

const upload = multer({
  dest: "C:/laragon/www/media-manager/temp",
  storage: storage,
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.post("/upload", upload.single("upload_media"), (req, res) => {
  var mimetypeArr = req.file.mimetype.split("/");
  var origformatArr = req.file.originalname.split(".");

  if (
    mimetypeArr[0] === "image" ||
    mimetypeArr[0] === "text" ||
    mimetypeArr[0] === "application" ||
    mimetypeArr[0] === "audio" ||
    mimetypeArr[0] === "video"
  ) {
    var sql =
      "INSERT INTO media (name, pathurl, type, upload_date) VALUES ('" +
      origformatArr[0] +
      "','uploads/" +
      filename +
      "','" +
      mimetypeArr[0] +
      "',NOW())";
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      // res.status(200).contentType("text/plain").end("File uploaded!");
      // req.flash('success', 'File has been successfully uploaded!');
      // res.redirect(200, "/");
      res.writeHead(302, {
        'Location': '/?success=true'
    });
    res.end();  
    });
  }
});

router.get("/getmedia", (req, res) => {
  var sql = "SELECT * FROM media";
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = router;
