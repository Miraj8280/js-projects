/*------------------------------------
        SELECTING DOM ELEMENTS
--------------------------------------*/
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const pageNotFound = document.querySelector(".not-found");

/*------------------------------------
        SEARCH FUNCTIONALITY
--------------------------------------*/
search.addEventListener("click", () => {
  // openWeatherMap API Key
  const APIKey = "your_api_key";

  // Extracting city name from input field
  const city = document.querySelector(".search-box input").value;

  // If city input empty
  if (city === "") {
    return;
  }

  // Fetch weather data from OpenWeatherMap API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      // If city not found
      if (json.cod === "404") {
        // Display error message and hide weather related elements
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        pageNotFound.style.display = "block";
        pageNotFound.classList.add("fadeIn");
        return;
      }

      // Hide error message if previous error exists
      pageNotFound.style.display = "none";
      pageNotFound.classList.remove("fadeIn");

      // Selecting elements to display weather information
      const image = document.querySelector(".weather-box img"); // Weather icon
      const temperature = document.querySelector(".weather-box .temperature"); // Temperature
      const description = document.querySelector(".weather-box .description"); // Weather description
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      ); // Humidity
      const wind = document.querySelector(".weather-details .wind span"); // Wind speed

      // Setting weather icon based on weather condition
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "assets/clear.png";
          break;
        case "Rain":
          image.src = "assets/rain.png";
          break;
        case "Snow":
          image.src = "assets/snow.png";
          break;
        case "Clouds":
          image.src = "assets/cloud.png";
          break;
        case "Haze":
          image.src = "assets/mist.png";
          break;
        default:
          image.src = "";
      }

      // Updating weather information in DOM
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      // Displaying weather elements and applying fade-in animation
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
