const app = {
  init: () => {
    //Get the current location when an user clicks the button
    document
      .getElementById("getLocation")
      .addEventListener("click", app.getLocation);
    // Add Event Listeners to the buttons
    document
      .getElementById("getWeather")
      .addEventListener("click", app.getWeather);
  },
  getLocation: () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      app.succesPosition,
      app.errorPosition,
      options
    );
  },
  getWeather: () => {
    let lat = document.getElementById("lat").value;
    let lon = document.getElementById("lon").value;
    let key = "f393719d4dc3c5dd50b94f8e2d980c43";
    let units = "metric";

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        app.showWeather(data);
      })
      .catch(console.error);
  },

  succesPosition: (position) => {
    document.getElementById("lat").value = position.coords.latitude.toFixed(3);
    document.getElementById("lon").value = position.coords.longitude.toFixed(3);
  },
  errorPosition: () => {
    console.error(error);
  },

  showWeather: (response) => {

    let weatherDaily = document.getElementById("weather-daily");
    let weatherHourly = document.getElementById("weather-hourly");

    weatherDaily.innerHTML = response.daily.map((day) => {
      let imageUrl = "http://openweathermap.org/img/wn/";
      let date = new Date(day.dt * 1000);
      return `
        <div class="col">
        <div class="card">
            <h5 class="card-title p-2">${date.toDateString()}</h5>
            <img src="${imageUrl}${
        day.weather[0].icon
      }@2x.png" class="card-img-top"/>
            <div class="card-body">
                <h3 class="card-title">${day.weather[0].main}</h3>
                <p class="card-text">Max: ${day.temp.max}&deg;C
                <p class="card-text">Min: ${day.temp.min}&deg;C</p>
            </div>
        </div>
        </div>`;
    });
    weatherHourly.innerHTML = response.hourly.map((hour, nrOfHours) => {
      if (nrOfHours <= 10) {
        let imageUrl = "http://openweathermap.org/img/wn/";
        let date = new Date(hour.dt * 1000);
        return `
          <div class="col">
          <div class="card">
          <h5 class="card-title p-2">${date.toDateString()}</h5>
              <h5 class="card-title p-2">${date.getHours()}:00</h5>
              <img src="${imageUrl}${
          hour.weather[0].icon
        }@2x.png" class="card-img-top"/>
              <div class="card-body">
                  <h3 class="card-title">${hour.weather[0].main}</h3>
                  <p class="card-text">Temp: ${hour.temp}&deg;C
              </div>
          </div>
          </div>`;
      }
    });
  },
};

app.init();
