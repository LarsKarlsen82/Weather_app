// Define translations for messages in Danish
const translations = {
    alreadyKnowWeather: "Du kender allerede vejret for",
    beMoreSpecific: "Vær mere specifik ved at angive landekoden også 😉",
    searchForValidCity: "Søg venligst efter en gyldig by 😩",
  };


/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/
const apiKey = "4d8fb5b93d4af21d66a2948710284366";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  //check if there's already a city
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      //athens,gr
      if (inputVal.includes(",")) {
        //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        //athens
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

//ajax here
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const { main, name, sys, weather } = data;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

    const li = document.createElement("li");
    li.classList.add("city");

    let iframeSrc = "";

    switch (weather[0]["main"]) { // Use "main" for weather description
      case "Clear":
        iframeSrc = "animation_clear.html";
        break;
      case "Sunny":
      case "Clear sky":
        iframeSrc = "animation_sunny.html";
        break;
      case "Rain":
      case "Drizzle":
      case "Light rain":
        iframeSrc = "animation_rain.html";
        break;
      case "Clouds":
      case "Broken clouds":
        iframeSrc = "animation_cloudy.html";
        break;
      case "Thunderstorm":
      case "Heavy thunderstorm":
      case "Heavy rain":
        iframeSrc = "animation_breezy.html";
        break;
      default:
        iframeSrc = "animation.html"; // Default iframe source for unknown conditions
        break;
    }

    const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="${icon}" alt="${weather[0]["main"]}">
        <figcaption>${weather[0]["main"]}</figcaption>
      </figure>
      <iframe id="animationFrame" src="${iframeSrc}" frameborder="0" style="border-radius: 30px; margin: 50px; width: 100; height: 100%;"></iframe>
    `;

    li.innerHTML = markup;
    list.appendChild(li);

    // Get a reference to the iframe element
    const animationFrame = document.getElementById("animationFrame");

    // Load the selected iframe source
    animationFrame.src = iframeSrc;
  })
  .catch(() => {
    msg.textContent = "Please search for a valid city 😩";
  });

  msg.textContent = "";
  form.reset();
  input.focus();


});

  // Get a reference to the reload button by its id
  let reloadButton = document.getElementById("reloadButton");

  // Add a click event listener to the button
  reloadButton.addEventListener("click", function() {
    // Reload the page when the button is clicked
    location.reload();
  });




// Forsøg:

      // // Get the current time in hours (0-23)
    // const currentTime = new Date().getHours();

    // // Check if it's night (you can adjust the time range as needed)
    // const isNight = currentTime >= 20 || currentTime < 6;

    // // Choose the appropriate iframe source based on weather and time
    // let iframeSrc = "";
    // if (weather[0]["description"] === "Clear" && isNight) {
    //   iframeSrc = "animation_clear_night.html";
    // } else if ((weather[0]["description"] === "Sunny" || weather[0]["description"] === "Clear sky") && !isNight) {
    //   iframeSrc = "animation_sunny.html";
    // } else if ((weather[0]["description"] === "Rain" || weather[0]["description"] === "Light rain") && !isNight) {
    //   iframeSrc = "animation_rain.html";
    // } else if (weather[0]["description"] === "Cloudy" && !isNight) {
    //   iframeSrc = "animation_cloudy.html";
    // } else if ((weather[0]["description"] === "Thunderstorm" || weather[0]["description"] === "Heavy rain") && !isNight) {
    //   iframeSrc = "animation_breezy.html";
    // } else {
    //   iframeSrc = "animation.html";
    // }



    // Try 2

        // // Check the weather condition and choose the appropriate iframe source
        // let iframeSrc = "";
        // if (weather[0]["description"] === "Clear") {
        //   iframeSrc = "animation_clear.html";
        // } else if (weather[0]["description"] === "Sunny", 'Clear sky') {
        //     iframeSrc = "animation_sunny.html";
        //   }
        // else if (weather[0]["description"] === "Rain", 'Light rain') {
        //   iframeSrc = "animation_rain.html";
        // }
        //   else if (weather[0]["description"] === "Cloudy") {
        //     iframeSrc = "animation_cloudy.html";
        //   }
        // else if (weather[0]["description"] === "Thunderstorm", 'heavy rain') {
        //         iframeSrc = "animation_breezy.html";
        // } else {
        //   iframeSrc = "animation.html";
        // }

    // Try 3

        // // Check the weather condition and choose the appropriate iframe source
        // let iframeSrc = "";
        // if (weather[0]["description"] === "Clear") {
        //   iframeSrc = "animation_clear.html";
        // } else if (weather[0]["description"] === "Sunny" || weather[0]["description"] === "Clear sky") {
        //   iframeSrc = "animation_sunny.html";
        // } else if (weather[0]["description"].includes("Rain") || weather[0]["description"] === "Light rain") {
        //   iframeSrc = "animation_rain.html";
        // } else if (weather[0]["description"] === "Cloudy", "Broken clouds") {
        //   iframeSrc = "animation_cloudy.html";
        // } else if (weather[0]["description"].includes("Thunderstorm") || weather[0]["description"] === "Heavy rain") {
        //   iframeSrc = "animation_breezy.html";
        // } else {
        //   iframeSrc = "animation.html"; // Default iframe source for unknown conditions
        // }
