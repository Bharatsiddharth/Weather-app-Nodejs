const { response } = require("express");

var weatherApi = "/weather";
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition")
const temperature = document.querySelector(".temperature");

const locationelem = document.querySelector(".place");
const date = document.querySelector(".date");

const currentDate = new Date();

date.textContent = currentDate;

const option = {month: "long"};
const Month = currentDate.toLocaleString("en", option);

date.textContent = currentDate.getDate() + "," + Month;




weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    locationelem.textContent = "...loading data";
    weatherIcon.className = "";
    temperature.textContent = "";
    weatherCondition.textContent = "";


})



function showData(city){
    getWeatherData(city, (result) => {
        
    })
}

function getWeatherData(city, callback){
    const LocalApi = weatherApi + "?address" + city;
    fetch(LocalApi).then((response) => {
        response.json().then((response) => {
            callback(response);
        });
    });
}