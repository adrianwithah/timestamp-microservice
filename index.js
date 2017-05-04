var express = require("express");
var path = require("path");
var app = express();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
app.set("views", path.join(__dirname, "views","pages"));
app.set("view engine","ejs");

app.get("/",function(request, response) {
	console.log("RENDERING HOMEPAGE!");
	response.render("homepage");
});

app.get("/:URL_STRING", function(request, response) {
	var date = new Date(request.params.URL_STRING);
	if (!isNaN(request.params.URL_STRING)) {
		date = new Date(parseInt(request.params.URL_STRING) * 1000);
	}
	console.log(date.toString() === "Invalid Date");
	var unixTime;
	var naturalTime
	if (date.toString() === "Invalid Date") {
		unixTime = null;
		naturalTime = null;
	} else {
		unixTime = Math.floor(date.getTime() / 1000);
		naturalTime = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
	}
	response.end(JSON.stringify({
		unix: unixTime,
		natural: naturalTime
	}));
});

app.listen(process.env.PORT || 5000);