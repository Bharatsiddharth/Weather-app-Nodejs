const express = require("express");
const hbs = require("hbs");
const path = require("path");


const app = express();
const weatherData = require("../utils/weatherdata");
const { error } = require("console");



const publicpath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views" ,viewspath);
hbs.registerPartials(partialspath);
app.use(express.static(publicpath));





const port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.render("index" ,{title : "Weather App"})
});

app.get("/weather", (req,res) => {
    if(!req.query.address){
        return res.send("address is required")
    }
    weatherData(req.query.address, (error,result) => {
        if(error){
            return res.send(error)
        }
        res.send(result);
    })
});

app.get("*", (req,res) => {
    res.render("404", {title : "Page not found"});
});

app.listen(port, () => {
    console.log("server is listening port" + port);
});