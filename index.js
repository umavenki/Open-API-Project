const currentDate = new Date();
const thisYear = currentDate.getFullYear();

const footer = document.createElement("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `<small>Uma Venki &#x00A9;${thisYear}</small>`;

footer.appendChild(copyright);
document.body.appendChild(footer);

const currentTemperatureElement = document.getElementById(
  "current-temperature"
);
const currentShowersElement = document.getElementById("current-showers");

const hourlyTemperature = document.getElementById("hourly-temperature");
console.log(hourlyTemperature);

fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=GMT"
)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Invalid Request");
    }
    return res.json();
  })
  .then((data) => {
    const temperature = data.current.temperature_2m;
    const showers = data.current.showers;
    currentTemperatureElement.innerText = temperature + "°C";
    currentShowersElement.innerText = showers + "mm";
    console.log(data.current.temperature_2m);
    console.log(data.current.showers);
    console.log(currentTemperatureElement);
  })
  .catch((err) => {
    console.warn(err);
  });

fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Invalid Request");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    const temperatures = data.hourly.temperature_2m;
    for (let i = 0; i < temperatures.length; i++) {
      const time = data.hourly.time[i];
      const li = document.createElement("li");
      li.innerText = time + " - " + temperatures[i];
      hourlyTemperature.appendChild(li);
    }
    console.log(temperatures);
  })
  .catch((err) => {
    console.warn(err);
  });
