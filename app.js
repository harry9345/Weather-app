let $ = document;

let inPutCity = $.getElementById("city");
let form = $.getElementById("formSubmit");
let showDiv = $.getElementById("showWeather");

const myApiKey = "2984cdd69bde16d2c7d12fa7f88ea814";

const sendRequest = async (sendUrl) => {
  const response = await fetch(sendUrl);
  return response.ok ? response.json() : Promise.reject({ error: 500 });
};
const getWeather = (theCity) => {
  const url = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${theCity}&units=metric&appid=${myApiKey}`
  );

  url
    .then((res) => res.json())
    .then((data) => {
      showResult(data);
    })
    .catch((er) => {
      console.log(er);
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showDiv.innerHTML = `
  <div class="loadingio-eclipse">
      <div class="ldio-rpinwye8j0b">
        <div></div>
      </div>
   </div>
`;
  getWeather(inPutCity.value);
});

function showResult(data) {
  console.log(data);
  showDiv.innerHTML = "";
  showDiv.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="col-sm-10">
        <div class="row align-items-center">
        <h1>Today weather in : <span class="red">${data.name} - ( ${data.sys.country} )</span></h1>
        </div>
        <div class="row align-items-center mainRes">
            <div class="col-sm-4 text-secondary">
            <h3>Min Temp: <span class="red">${data.main.temp_min}</span></h3>
            <h3>Max Temp: <span class="red">${data.main.temp_max}</span></h3>
            <h3>Feels like : <span class="red"> ${data.main.feels_like}</span></h3>
            </div>
            <div class="col-sm-4 text-secondary">
            <h3> Description : <span class="red">${data.weather[0].description}</span></h3>
            <h3> Wind Deg :<span class="red">${data.wind.deg}</span></h3>
            <h3> Wind Speed :<span class="red">${data.wind.speed}</span></h3>
            </div>
        </div>
    </div>
  `
  );
}
