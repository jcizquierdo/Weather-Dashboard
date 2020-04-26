var searchTerm = document.querySelector("#city-search-input");
var apiKey = '8dce35e0f3e907a2dd8dc91e6f1e35ad';
var nameEl = document.querySelector(".city-name");
var tempEl = document.querySelector("#temp2");
var humidityEl = document.querySelector("#humid");
var windspeedEl = document.querySelector("#ws");
var uvIndexEl = document.querySelector("#uv");
var currentDate = document.querySelector(".city-name-date");
var iconImg = document.querySelector(".current-icon");
var icon1 = document.querySelector(".card-icon1");
var icon2 = document.querySelector(".card-icon2");
var icon3 = document.querySelector(".card-icon3");
var icon4 = document.querySelector(".card-icon4");
var icon5 = document.querySelector(".card-icon5");
var searchDisplay = document.querySelector("#search-display");


// $("city-search-btn").on("click")
var term = function() {
    var termValue = searchTerm.value;
    getCity(termValue);
    historyButton(termValue);
}


function getCity(termValue) {
    //fetch for temp, humidity, and windspeed
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ termValue + '&appid=' + apiKey + '&units=imperial')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        //city current weather info
        var name = data.name;
        var date = moment().format("MM/DD/YYYY");
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windspeed = data.wind.speed;
        //appending on page and setting in storage
        // current cityName
        nameEl.innerHTML = name;
        localStorage.setItem('cityName', name);

        // current cityDate
        currentDate.innerHTML = date;
        localStorage.setItem('cityDate', date);

        // current cityTemp
        tempEl.innerHTML = temp;
        localStorage.setItem('cityTemp', temp);

        // current cityHumidity
        humidityEl.innerHTML = humidity;
        localStorage.setItem('cityHumidity', humidity);

        // current cityWindSpeed
        windspeedEl.innerHTML = windspeed;
        localStorage.setItem('cityWindSpeed', windspeed);

        // current cityIcon
        var icon = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        iconImg.setAttribute("src", iconurl);
        localStorage.setItem('currentIcon', iconurl);

        // current uv index info
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;
    
        //fetch for current uv index
        fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // current cityUV
            uvIndex = data.value
            uvIndexEl.innerHTML = uvIndex;
            if (uvIndex >= 1) { 
                document.getElementById("uv").setAttribute("class", "uvBackgroundLow")
            }
            if (uvIndex >= 5) { 
                document.getElementById("uv").setAttribute("class", "uvBackgroundMod")
            }
            if (uvIndex >= 8) {
                // var indexColor = 
                document.getElementById("uv").setAttribute("class", "uvBackgroundHigh");
                // console.log(indexColor);
                // localStorage.setItem('uvColor', indexColor);
            }
            localStorage.setItem('cityUV', uvIndex);
        });
    })
    getForecast(termValue);
}

    
        var getForecast = function(termValue) {
        //fetch for 5 day forecast
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + termValue + '&appid=' + apiKey + '&units=imperial')
        .then((response) => {
            return response.json();
        })
        
        .then((data) => {
            // trimmed array to always start on the next day
            var today = moment().format("YYYY-MM-DD");

            let trimmedArr = data.list.filter((item) => {
                return item.dt_txt.slice(0, 10) !== today
            })
        

        // dates for 5 day forecast cards
        var cardDate1 = moment(trimmedArr[0].dt_txt).format("MM/DD");
        var cardDate2 = moment(trimmedArr[8].dt_txt).format("MM/DD");
        var cardDate3 = moment(trimmedArr[16].dt_txt).format("MM/DD");
        var cardDate4 = moment(trimmedArr[24].dt_txt).format("MM/DD");
        var cardDate5 = moment(trimmedArr[32].dt_txt).format("MM/DD");
        
        $("#forecast-date1").html(cardDate1);
        localStorage.setItem('cardDate1', cardDate1);
        $("#forecast-date2").html(cardDate2);
        localStorage.setItem('cardDate2', cardDate2);
        $("#forecast-date3").html(cardDate3);
        localStorage.setItem('cardDate3', cardDate3);
        $("#forecast-date4").html(cardDate4);
        localStorage.setItem('cardDate4', cardDate4);
        $("#forecast-date5").html(cardDate5);
        localStorage.setItem('cardDate5', cardDate5);
        
        // temp for  5 day forecast cards
        var cardTemp1 = trimmedArr[0].main.temp
        var cardTemp2 = trimmedArr[8].main.temp
        var cardTemp3 = trimmedArr[16].main.temp
        var cardTemp4 = trimmedArr[24].main.temp
        var cardTemp5 = trimmedArr[32].main.temp
        $("#card-temp1").html(cardTemp1);
        localStorage.setItem('cardTemp1', cardTemp1);
        $("#card-temp2").html(cardTemp2);
        localStorage.setItem('cardTemp2', cardTemp2);
        $("#card-temp3").html(cardTemp3);
        localStorage.setItem('cardTemp3', cardTemp3);
        $("#card-temp4").html(cardTemp4);
        localStorage.setItem('cardTemp4', cardTemp4);
        $("#card-temp5").html(cardTemp5);
        localStorage.setItem('cardTemp5', cardTemp5);

        // humidity for 5 day forecast cards
        var cardHum1 = trimmedArr[0].main.humidity
        var cardHum2 = trimmedArr[8].main.humidity
        var cardHum3 = trimmedArr[16].main.humidity
        var cardHum4 = trimmedArr[24].main.humidity
        var cardHum5 = trimmedArr[32].main.humidity
        $("#card-hum1").html(cardHum1);
        localStorage.setItem('cardHum1', cardHum1);
        $("#card-hum2").html(cardHum2);
        localStorage.setItem('cardHum2', cardHum2);
        $("#card-hum3").html(cardHum3);
        localStorage.setItem('cardHum3', cardHum3);
        $("#card-hum4").html(cardHum4);
        localStorage.setItem('cardHum4', cardHum4);
        $("#card-hum5").html(cardHum5);
        localStorage.setItem('cardHum5', cardHum5);
        

        // card Icons
        // card icon 1
        var cardIcon1 = trimmedArr[0].weather[0].icon;
        var iconurl1 = "http://openweathermap.org/img/w/" + cardIcon1 + ".png";
        icon1.setAttribute("src", iconurl1);
        localStorage.setItem('cardicon1', iconurl1);
        //card icon 2
        var cardIcon2 = trimmedArr[8].weather[0].icon;
        var iconurl2 = "http://openweathermap.org/img/w/" + cardIcon2 + ".png";
        icon2.setAttribute("src", iconurl2);
        localStorage.setItem('cardicon2', iconurl2);
        // card icon 3
        var cardIcon3 = trimmedArr[16].weather[0].icon;
        var iconurl3 = "http://openweathermap.org/img/w/" + cardIcon3 + ".png";
        icon3.setAttribute("src", iconurl3);
        localStorage.setItem('cardicon3', iconurl3);
        // card icon 4
        var cardIcon4 = trimmedArr[24].weather[0].icon;
        var iconurl4 = "http://openweathermap.org/img/w/" + cardIcon4 + ".png";
        icon4.setAttribute("src", iconurl4);
        localStorage.setItem('cardicon4', iconurl4);
        // card icon 5
        var cardIcon5 = trimmedArr[32].weather[0].icon;
        var iconurl5 = "http://openweathermap.org/img/w/" + cardIcon5 + ".png";
        icon5.setAttribute("src", iconurl5);
        localStorage.setItem('cardicon5', iconurl5);

    })
    
    };
   
    var historyButton = function(termValue) {
    //display city search history
    var displayHistory = document.createElement("button");
    $(displayHistory).addClass("btn btn-light btn-lg history");
    displayHistory.innerHTML = termValue;
    displayHistory.onclick = function() {
    getCity(termValue);
    }
    $("#search-display").append(displayHistory);
    }
    historyButton();


// getitems for current city
// getitem for current city name
var cityName = localStorage.getItem('cityName');
nameEl.innerHTML = (cityName);
// getitem for current city date
var cityDate = localStorage.getItem('cityDate');
currentDate.innerHTML = (cityDate);
// getitem for current city temp
var cityTemp = localStorage.getItem('cityTemp');
tempEl.innerHTML = cityTemp;
// getitem for current city humidity
var cityHumidity = localStorage.getItem('cityHumidity');
humidityEl.innerHTML = cityHumidity;
// getitem for current city windspeed
var cityWindSpeed = localStorage.getItem('cityWindSpeed');
windspeedEl.innerHTML = cityWindSpeed;
// getitem for current city uv
var cityUV = localStorage.getItem('cityUV');
uvIndexEl.innerHTML = cityUV;


// getitems for cards
// get item for card dates
var date1 = localStorage.getItem('cardDate1');
$("#forecast-date1").html(date1);
var date2 = localStorage.getItem('cardDate2');
$("#forecast-date2").html(date2);
var date3 = localStorage.getItem('cardDate3');
$("#forecast-date3").html(date3);
var date4 = localStorage.getItem('cardDate4');
$("#forecast-date4").html(date4);
var date5 = localStorage.getItem('cardDate5');
$("#forecast-date5").html(date5);

//get item for card temps
var temp1 = localStorage.getItem('cardTemp1');
$("#card-temp1").html(temp1);
var temp2 = localStorage.getItem('cardTemp2');
$("#card-temp2").html(temp2);
var temp3 = localStorage.getItem('cardTemp3');
$("#card-temp3").html(temp3);
var temp4 = localStorage.getItem('cardTemp4');
$("#card-temp4").html(temp4);
var temp5 = localStorage.getItem('cardTemp5');
$("#card-temp5").html(temp5);

//get item for card humidity
var Hum1 = localStorage.getItem('cardHum1');
$("#card-hum1").html(Hum1);
var Hum2 = localStorage.getItem('cardHum2');
$("#card-hum2").html(Hum2);
var Hum3 = localStorage.getItem('cardHum3');
$("#card-hum3").html(Hum3);
var Hum4 = localStorage.getItem('cardHum4');
$("#card-hum4").html(Hum4);
var Hum5 = localStorage.getItem('cardHum5');
$("#card-hum5").html(Hum5);

// get item for current icon
var currentIcon = localStorage.getItem('currentIcon');
iconImg.setAttribute("src", currentIcon);

// get items for card icons
var Icon1 = localStorage.getItem('cardicon1');
icon1.setAttribute("src", Icon1);

var Icon2 = localStorage.getItem('cardicon2');
icon2.setAttribute("src", Icon2);

var Icon3 = localStorage.getItem('cardicon3');
icon3.setAttribute("src", Icon3);

var Icon4 = localStorage.getItem('cardicon4');
icon4.setAttribute("src", Icon4);

var Icon5 = localStorage.getItem('cardicon5');
icon5.setAttribute("src", Icon5);
