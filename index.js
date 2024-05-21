const latitudeEl = document.getElementById("latname");
const longitudeEl = document.getElementById("logname");

const currentTemperatureElement = document.getElementById(
  "current-temperature"
);
const currentWindSpeedElement = document.getElementById("current-windspeed");
const hourlyWindSpeedElement = document.getElementById("hourly-windspeed");

const hourlyTemperature = document.getElementById("hourly-temperature");
console.log(hourlyWindSpeedElement);
console.log(hourlyTemperature);

function getFullForecast() {
  const latitude = latitudeEl.value;
  const longitude = longitudeEl.value;
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Invalid Request");
      }
      return res.json();
    })
    .then((data) => {
      hourlyTemperature.innerHTML = "";
      currentTemperatureElement.innerHTML = "";
      hourlyWindSpeedElement.innerHTML = "";
      currentWindSpeedElement.innerHTML = "";
      console.log(data);
      const temperatures = data.hourly.temperature_2m;
      const windspeeds = data.hourly.wind_speed_10m;
      /*for (let i = 0; i < temperatures.length; i++) {
            const time = data.hourly.time[i];
            const li = document.createElement("li");
            li.innerText = time + " - " + temperatures[i];
            hourlyTemperature.appendChild(li);
            }*/
      let currentDate = "";
      let currentLow = 0;
      let currentHigh = 0;
      let currentWindSpeedLow = 0;
      let curentWindSpeedHigh = 0;
      for (let i = 0; i < temperatures.length; i++) {
        let time = data.hourly.time[i];
        let windspeed = windspeeds[i];
        let date = time.substring(0, 10);
        if (currentDate == date) {
          currentDate = date;
          if (currentLow > temperatures[i]) {
            currentLow = temperatures[i];
          }
          if (currentHigh < temperatures[i]) {
            currentHigh = temperatures[i];
          }
          if (currentWindSpeedLow > windspeed) {
            currentWindSpeedLow = windspeed;
          }
          if (curentWindSpeedHigh < windspeed) {
            curentWindSpeedHigh = windspeed;
          }
        } else {
          if (i != 0) {
            const li = document.createElement("li");
            li.innerText =
              "Date :" +
              currentDate +
              " High :" +
              currentHigh +
              " Low :" +
              currentLow;
            hourlyTemperature.appendChild(li);
            const li2 = document.createElement("li");
            li2.innerText =
              "Date :" +
              currentDate +
              " High Wind :" +
              curentWindSpeedHigh +
              " Low  Wind:" +
              currentWindSpeedLow;
            hourlyWindSpeedElement.appendChild(li2);
          }
          currentDate = date;
          currentLow = temperatures[i];
          currentHigh = temperatures[i];
          // Set for windspeed
          curentWindSpeedHigh = windspeed;
          currentWindSpeedLow = windspeed;
        }
      }
      console.log(temperatures);
    })
    .catch((err) => {
      console.warn(err);
    });
}
function getCurrentForecast() {
  const latitude = latitudeEl.value;
  const longitude = longitudeEl.value;

  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Invalid Request");
      }
      return res.json();
    })
    .then((data) => {
      hourlyTemperature.innerHTML = "";
      currentTemperatureElement.innerHTML = "";
      currentWindSpeedElement.innerHTML = "";
      hourlyWindSpeedElement.innerHTML = "";
      const temperature = data.current.temperature_2m;
      const windspeed = data.current.wind_speed_10m;
      currentTemperatureElement.innerText = temperature + "°C";
      currentWindSpeedElement.innerText = windspeed + "km/h";
      console.log(data.current.temperature_2m);
      console.log(data.current.wind_speed_10m);
      console.log(currentTemperatureElement);
      console.log(currentWindSpeedElement);
    })
    .catch((err) => {
      console.warn(err);
    });
}

const currentDate = new Date();
const thisYear = currentDate.getFullYear();

const footer = document.createElement("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `<small>Uma Venki &#x00A9;${thisYear}</small>`;

footer.appendChild(copyright);
document.body.appendChild(footer);
