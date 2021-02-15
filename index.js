
/**
 * Layout
E necessario creare una input text HTML che permetta di digitare il nome di una città. L’API
va richiamata al click su un pulsante posto accanto all’input di text. Quando si atterra sulla
pagina, prevedere una visualizzazione a “card” del meteo di queste 4 città: Roma, Londra,
Madrid, New York.
 * 
 */

// const state = {
//   cities: null
// }


// function call() {
//   fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=3a6190d85f31d51b97e9a8f55d3a2aaa', {
//       method: 'GET'
//   })
//       .then( (response) => {
//           console.log('risposta fetch:', response);

//           return response.json();

//       })
//      .then((dataJson) => {
          
//           state.cities = dataJson;
//           console.log('state.cities: ', state.cities);
             
          
//       });

  
// }
// document.addEventListener("DOMContentLoaded", call);

//--------------------------------------------------------------------

const h2Title = document.querySelector('.input>h2');
const textInput = document.querySelector('#textInput');
const textOutput = document.querySelector('#textOutput');
const textOutput2 = document.querySelector('#textOutput2');
const textOutput3 = document.querySelector('#textOutput3');
const textOutput4 = document.querySelector('#textOutput4');
const errorBanner = document.querySelector('.errorBanner');
const myForm = document.querySelector('form');

const state = {
  config: {
    api_key: "3a6190d85f31d51b97e9a8f55d3a2aaa",
    base_url: "https://api.openweathermap.org/data/2.5/weather?q=",
    images: null
  },
  cities: null
};

function getUrl(cityName) {
  const { api_key, base_url } = state.config;

  composedUrl = `${base_url}${cityName}&appid=${api_key}&units=metric`;

  console.log('--> composedUrl= ',composedUrl)

  return composedUrl;
}   

async function getData() {

const cityName = textInput.value;
console.log('cityName= ',cityName.value);

const cityURL = getUrl(cityName);
console.log("cityURL= ",cityURL);

  try {
    const response = await fetch(cityURL);
    const result = await response.json();

    if (!response.ok) {
      throw (new Error(`${textInput.value} non è stata trovata`));
    }

    console.log("risultato chiamata positivo: ", result);
    
    state.cities = result;

    const cityNameCapitalized = capitalizeFirstLetter(`${cityName}`);
    h2Title.textContent = `Today's Wheather in ${cityNameCapitalized}`;

    textOutput.textContent = state.cities.weather[0].description;
    textOutput2.textContent = `${state.cities.main.temp} C`;
    textOutput3.textContent = `${state.cities.main.temp_min} C`;
    textOutput4.textContent = `${state.cities.main.temp_max} C`;
    textInput.value = ""; 

  } catch (errorMessage) {
    console.log(errorMessage);

    errorBanner.textContent = errorMessage;

    textInput.value = ""; 
  }
}

myForm.addEventListener("submit", callGetData);


function callGetData(event) {
  event.preventDefault();

  textOutput.textContent = "";
  textOutput2.textContent = "";
  errorBanner.textContent = "";

  getData();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}