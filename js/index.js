const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// خاصية تحديد الموقع
navigator.geolocation.getCurrentPosition(
    function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getData(`${latitude},${longitude}`);
    },
    function (error) {
        console.log("Could not get your location");
        getData("Kafr Ash Shaykh");
    }
);


document.getElementById("input-value").addEventListener("input",function(){
    let ValueInput = document.getElementById("input-value").value;
    console.log(ValueInput);
    getData(ValueInput);
})

document.getElementById("button-addon2").addEventListener("click",function(){
    let ValueInput = document.getElementById("input-value").value;
    console.log(ValueInput);
    getData(ValueInput);
})

async function getData(city) {
    try {
        let promise = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4f1bb927e02e4e9cae7172644241212&q=${city}&days=3`);
        let response = await promise.json();
        console.log(response);
        displyData(response);
    } catch (error) {
        console.log(error);
    }
}

function getDays(date) {
    return new Date(date);
}


function displyData(response){
    let forecastDay = response.forecast.forecastday;
    let curentDay = days[getDays(forecastDay[0].date).getDay()];
    let nextDay = days[getDays(forecastDay[1].date).getDay()];
    let latestDay = days[getDays(forecastDay[2].date).getDay()];
    let curentMonthDay = months[getDays(forecastDay[0].date).getMonth()];
    let curentMonthNum = new Date().getDate();
    let cartona = ``;
        cartona += `<div class="col-12 col-lg-4 ">
                            <div class="card h-100">
                                <div class="card-header d-flex justify-content-between">
                                    <div class="day">${curentDay}</div>
                                    <div class="date">${curentMonthNum} ${curentMonthDay}</div>
                                </div>
                                <div class="card-body">
                                    <div class="city">${response.location.name}</div>
                                    <div class="degree-top text-center">${response.current.temp_c}<sup>o</sup>C</div>
                                    <div class="weather-icon">
                                        <img src="${response.current.condition.icon}" class="img-fluid">
                                    </div>
                                    <div class="weather-description">${response.current.condition.text}</div>
                                    <ul class="list-unstyled mt-4 d-flex column-gap-3">
                                        <li><img src="images/icon-umberella.png"> ${response.current.cloud}%</li>
                                        <li><img src="images/icon-wind.png">  ${response.current.wind_kph}km/h</li>
                                        <li><img src="images/icon-compass.png"> ${response.current.wind_dir}</li>
                                    </ul> 
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4">
                            <div class="card h-100">
                                <div class="card-header card-header-center text-center">${nextDay}</div>
                                <div class="card-body card-body-center text-center">
                                    <div class="weather-icon pt-4">
                                        <img src="${response.forecast.forecastday[1].day.condition.icon}">
                                    </div>
                                    <div class="degree mt-3">${response.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
                                    <div class="second-degree">${response.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></div>
                                    <div class="weather-description mt-3">${response.forecast.forecastday[1].day.condition.text}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4">
                            <div class="card h-100">
                                <div class="card-header text-center">${latestDay}</div>
                                <div class="card-body text-center">
                                    <div class="weather-icon pt-4">
                                        <img src="${response.forecast.forecastday[2].day.condition.icon}">
                                    </div>
                                    <div class="degree mt-3">${response.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
                                    <div class="second-degree">${response.forecast.forecastday[2].day.condition.text}<sup>o</sup></div>
                                    <div class="weather-description mt-3">Sunny</div>
                                </div>
                            </div>
                        </div>`;
    document.getElementById("card-group").innerHTML = cartona;
    }


