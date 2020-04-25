var searchTerm = document.querySelector("#city-search-input");
var apiKey = '8dce35e0f3e907a2dd8dc91e6f1e35ad';
var nameEl = document.querySelector(".city-name");
var tempEl = document.querySelector("#temp2");
var humidityEl = document.querySelector("#humid");
var windspeedEl = document.querySelector("#ws");
var uvIndexEl = document.querySelector("#uv");
var currentDate = document.querySelector(".city-name-date");
var currentIcon = document.querySelector(".current-icon");

var tomorrow = moment().add(1, 'day')
console.log(tomorrow);


function getCity() {
    //fetch for temp, humidity, and windspeed
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ searchTerm.value + '&appid=' + apiKey + '&units=imperial')
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
        console.log(icon);
        var currentIconDisplay = fetch("http://openweathermap.org/img/wn/" + icon + "@2x.png")
        console.log(currentIconDisplay);
        currentIcon.innerHTML = currentIconDisplay;
        
        
        // current uv index info
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        
        // var currentInfo = [name, date, temp, humidity, windspeed];
        // localStorage.setItem('current', currentInfo);
        // console.log(localStorage);
        
        // var loadCurrent = localStorage.getItem('current');
        // $('.right-container').html(loadCurrent);
        // function loadCurrent() {

        // }
    
    //fetch for current uv index
    fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // current cityUV
        uvIndex = data.value
        uvIndexEl.innerHTML = uvIndex;
        localStorage.setItem('cityUV', uvIndex);
    });
    

    //fetch for 5 day forecast
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchTerm.value + '&appid=' + apiKey + '&units=imperial')
    .then((response) => {
        // console.log(response);
        return response.json();
    })
    .then((data) => {
        // dates for 5 day forecast cards\
        // start for loop?
        


        var cardDate1 = moment(data.list[0].dt_txt).format("MM/DD/YYYY");
        var cardDate2 = moment(data.list[8].dt_txt).format("MM/DD/YYYY");
        var cardDate3 = moment(data.list[16].dt_txt).format("MM/DD/YYYY");
        var cardDate4 = moment(data.list[24].dt_txt).format("MM/DD/YYYY");
        var cardDate5 = moment(data.list[32].dt_txt).format("MM/DD/YYYY");
        
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
        var cardTemp1 = data.list[0].main.temp
        var cardTemp2 = data.list[8].main.temp
        var cardTemp3 = data.list[16].main.temp
        var cardTemp4 = data.list[24].main.temp
        var cardTemp5 = data.list[32].main.temp
        $("#card-temp1").html(cardTemp1);
        $("#card-temp2").html(cardTemp2);
        $("#card-temp3").html(cardTemp3);
        $("#card-temp4").html(cardTemp4);
        $("#card-temp5").html(cardTemp5);

        // humidity for 5 day forecast cards
        var cardHum1 = data.list[0].main.humidity
        var cardHum2 = data.list[8].main.humidity
        var cardHum3 = data.list[16].main.humidity
        var cardHum4 = data.list[24].main.humidity
        var cardHum5 = data.list[32].main.humidity
        $("#card-hum1").html(cardHum1);
        $("#card-hum2").html(cardHum2);
        $("#card-hum3").html(cardHum3);
        $("#card-hum4").html(cardHum4);
        $("#card-hum5").html(cardHum5);

    })
    
    });


    

    //display city search history
    var displayHistory = document.createElement("button");
    $(displayHistory).addClass("btn btn-light btn-lg history");
    displayHistory.innerHTML = searchTerm.value;
    $("#search-display").append(displayHistory);
    
    
    
};

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
var cityWindSpeed = localStorage.getItem('cityHumidity');
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
