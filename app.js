var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("menu");
})

app.get("/game/:mode", function(req, res){
    if(req.params.mode == "default"){
        res.render("game-default");
    }else if(req.params.mode == "constant"){
        res.render("game-constant");
    }
});


app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("server started");
});