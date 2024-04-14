// const { response } = require("express");

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


if ("geolocation" in navigator) {
    locationelem.textContent = "Loading...";
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.address && data.address.city) {
              const city = data.address.city;
  
              showData(city);
            } else {
              console.error("City not found in location data.");
            }
          })
          .catch((error) => {
            console.error("Error fetching location data:", error);
          });
      },
      function (error) {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not available in this browser.");
  }


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    locationelem.textContent = "...loading data";
    weatherIcon.className = "";
    temperature.textContent = "";
    weatherCondition.textContent = "";

    showData(search.value);
})



function showData(city){
    getWeatherData(city, (result) => {
        console.log(result)
        if(result.cod == 200){
            if( result.weather[0].description == "rain" || 
                result.weather[0].description == "fog"){
                weatherIcon.className = "wi wi-day-" + result.weather[0].description;
            } else{
                weatherIcon.className = "wi wi-day-cloudy"
            }

          
            locationelem.textContent = result?.name;
            temperature.textContent = (result?.main?.temp - 273.5   ).toFixed(2) + String.fromCharCode(176);
            weatherCondition.textContent = result?.weather[0]?.description?.toUpperCase();

        } else{
            locationelem.textContent = "city not found"
        }
        
    })
}

function getWeatherData(city, callback){
    const LocalApi = weatherApi + "?address=" + city;
    fetch(LocalApi).then((response) => {
        response.json().then((response) => {
            callback(response);
        });
    });
}