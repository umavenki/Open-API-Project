const currentDate = new Date();
const thisYear = currentDate.getFullYear();

const footer = document.createElement("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `<small>Uma Venki &#x00A9;${thisYear}</small>`;

footer.appendChild(copyright);
document.body.appendChild(footer);

const temperatureElement = document.getElementById("current-temperature");
const showersElement = document.getElementById("current-showers");

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
    temperatureElement.innerText = temperature + "°C";
    showersElement.innerText = showers + "mm";
    console.log(data.current.temperature_2m);
    console.log(data.current.showers);
    console.log(temperatureElement);
  })
  .catch((err) => {
    console.warn(err);
  });
