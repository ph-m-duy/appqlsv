var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var fs = require("fs");

var test = fs.writeFileSync('./database/tex.text', "fsgmskgms")
console.log("ddax akafma")