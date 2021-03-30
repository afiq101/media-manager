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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var origformatArr = file.originalname.split(".");
    cb(null, file.originalname.replace(/ /g,"_") + "-" + Date.now() + "." + origformatArr[1]);
  },
});

const upload = multer({
  dest: "C:/laragon/www/media-manager/temp",
  storage: storage,
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.post("/upload", upload.single("upload_media"), (req, res) => {
    
    // var mimetypeArr = req.file.mimetype.split("/");

    // if (
    //   mimetypeArr[0] === "image" ||
    //   mimetypeArr[0] === "text" ||
    //   mimetypeArr[0] === "application" ||
    //   mimetypeArr[0] === "audio"
    // ) {
    //   connection.connect();
    //   var sql =
    //     "INSERT INTO media (description, pathurl, type) VALUES ('Company Inc', 'Highway 37')";
    //   connection.query(
    //     sql,
    //     function (error, results, fields) {
    //       if (error) throw error;
    //       console.log("The solution is: ", results[0].solution);
    //     }
    //   );

    //   connection.end();
    // }
    //   console.log(req.file);

});

module.exports = router;
//   const tempPath = req.file.path;
//   const targetPath = path.join(__dirname, "./uploads/images.png");
//   res.status(200).contentType("text/plain").end("File uploaded!");
//   console.log(req.file);
//   if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//     fs.rename(tempPath, targetPath, (err) => {
//       if (err) return handleError(err, res);

//       res.status(200).contentType("text/plain").end("File uploaded!");
//     });
//   } else {
//     fs.unlink(tempPath, (err) => {
//       if (err) return handleError(err, res);

//       res
//         .status(403)
//         .contentType("text/plain")
//         .end("Only .png files are allowed!");
//     });
//   }
