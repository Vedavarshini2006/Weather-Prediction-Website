const apiKey = "a847940ff46181402f619f8012c558ef"; // Replace with your actual API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (city === "") {
    document.getElementById("weatherResult").innerHTML = `<p>Please enter a city name 🌍</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherDiv = document.getElementById("weatherResult");

      if (data.cod === 200) {
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const name = data.name;
        const country = data.sys.country;
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;

        weatherDiv.innerHTML = `
          <h3>${name}, ${country}</h3>
          <img src="${iconUrl}" alt="weather icon" />
          <p><strong>Weather:</strong> ${description}</p>
          <p><strong>Temperature:</strong> ${temp} °C</p>
          <p><strong>Feels Like:</strong> ${feelsLike} °C</p>
          <p><strong>Min Temp:</strong> ${tempMin} °C | <strong>Max Temp:</strong> ${tempMax} °C</p>
          <p><strong>Humidity:</strong> ${humidity}% 💧</p>
          <p><strong>Wind Speed:</strong> ${windSpeed} m/s 🌬️</p>
        `;
      } else {
        weatherDiv.innerHTML = `<p>City not found ❌</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      document.getElementById("weatherResult").innerHTML = `<p>Something went wrong. Please try again later ⚠️</p>`;
    });
}
