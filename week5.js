// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=45a3cb0d58c947788dd11853213004&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
  let weatherButton = document.querySelector(`.get-weather`)
    // When the "get weather" button is clicked:
  weatherButton.addEventListener (`click`, async function(event) {
      // - Ignore the default behavior of the button
  event.preventDefault()
      // - Get a reference to the element containing the user-entered location
  let location = document.querySelector(`#location`)
      // - Get the user-entered location from the element's value
  let definedLocation = location.value 
      // - Check to see if the user entered anything; if so:
  if (definedLocation.length > 0) {
        // - Construct a URL to call the WeatherAPI.com API
  let url = `https://api.weatherapi.com/v1/forecast.json?key=45a3cb0d58c947788dd11853213004&q=${definedLocation}&days=3`
        // - Fetch the url, wait for a response, store the response in memory
  let response = await fetch(url)
  
  
     // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        
    // - Write the json-formatted data to the JavaScript console
        console.log(json)
    // - Store the interpreted location, current weather conditions, the forecast as three separate variables
  let place = json.location
  
  let currentWeather = json.current
  let forecast = json.forecast
//   Get a reference to the locaton of the current weather display
  let currentElement = document.querySelector(`.current`)
//   insert HTML to current forecast
  currentElement.innerHTML = `<div class="text-center space-y-2">
  <div class="font-bold text-3xl">Current Weather for ${place.name}, ${place.region}</div>
  <div class="font-bold">
    <img src="https:${currentWeather.condition.icon}" class="inline-block">
    <span class="temperature">${currentWeather.temp_f}</span>° 
    and
    <span class="conditions">${currentWeather.condition.text}</span>
  </div>
  </div>`
  // - Get a reference to the element containing the user entered location
  let days = document.querySelector(`#days`)
  // Store number of days selected to memory
  let daysPicked = days.value
 

// get a reference to the location of the forecast weather display
let forecastElement = document.querySelector(`.forecast`)

// Check to see if the user entered a value for Days
if (daysPicked > 0) {

// insert HTML for forecast header
forecastElement.insertAdjacentHTML(`beforeend`, `<div class="text-center space-y-8">
<div class="font-bold text-3xl">${daysPicked} Day Forecast</div>`)


// Run a loop depending on number of days selected

for (let i=0; i < daysPicked; i++) {
let dayForecast = forecast.forecastday[i]

forecastElement.insertAdjacentHTML(`beforeend`,
`<div class"mx-auto">
  <img src="https:${dayForecast.day.condition.icon}" >
  <h1 class="text-2xl text-bold text-gray-500">${dayForecast.date}</h1>
  <h2 class="text-xl">High ${dayForecast.day.maxtemp_f}° – Low ${dayForecast.day.mintemp_f}°</h2>
  <h2 class="text-gray-500">${dayForecast.day.condition.text}</h2>
</div>`
)
    }}
      
  }
  
  })
  })