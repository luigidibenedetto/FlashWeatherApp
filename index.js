
/**
 * Layout
E necessario creare una input text HTML che permetta di digitare il nome di una città. L’API
va richiamata al click su un pulsante posto accanto all’input di text. Quando si atterra sulla
pagina, prevedere una visualizzazione a “card” del meteo di queste 4 città: Roma, Londra,
Madrid, New York.
 * 
 */


const imgCloud = document.querySelector('#imgCloud');
const imgSun = document.querySelector('#imgSun');
const h2Title = document.querySelector('.input>h2');
const textInput = document.querySelector('#textInput');
const card = document.querySelector('.card');
const textOutput = document.querySelector('#textOutput');
const textOutput2 = document.querySelector('#textOutput2');
const textOutput3 = document.querySelector('#textOutput3');
const textOutput4 = document.querySelector('#textOutput4');
const errorBanner = document.querySelector('.errorBanner');
const myForm = document.querySelector('form');
const cardsContainer = document.querySelector('.cardsContainer');
const cloudsUrl =  'https://www.tortoretometeo.it/weather28/wsIcons/default_icons/400.png';
const sunUrl = 'https://impattosonoro.it/wp-content/themes/impatto-theme/images/sole-150x150.png';

const state = {
  config: {
    api_key: "3a6190d85f31d51b97e9a8f55d3a2aaa",
    base_url: "https://api.openweathermap.org/data/2.5/weather?q=",
    
  },
  cities : null,
  rome: null,
  london: null,
  madrid: null,
  newYork: null
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
      throw (new Error(`${capitalizeFirstLetter(textInput.value)} was not found`));
    }

    console.log("risultato chiamata positivo: ", result);
    
    state.cities = result;

    renderMainCard(cityName);

  } catch (errorMessage) {
    console.log(errorMessage);

    card.classList.remove('is_notVisible');
    textInput.classList.add('smallMarginBtt');

    imgCloud.classList.remove('is_visible');
    imgSun.classList.remove('is_visible');

    errorBanner.textContent = errorMessage;

    textInput.value = ""; 
    h2Title.textContent = "";
    textOutput3.textContent = "";
    textOutput4.textContent = "";
    textInput.blur();
  }
}

myForm.addEventListener("submit", callGetData);


function callGetData(event) {
  event.preventDefault();

  textOutput2.textContent = "";
  textOutput3.textContent = "";
  textOutput4.textContent = "";
  errorBanner.textContent = "";

  getData();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function renderMainCard(cityName) {
  
  const cityNameCapitalized = capitalizeFirstLetter(`${cityName}`);
  h2Title.textContent = `Today's Weather in ${cityNameCapitalized}`;

  card.classList.remove('is_notVisible');
  textInput.classList.add('smallMarginBtt');
  cardsContainer.classList.remove('is_notVisible');

  //Logica per visualizzazione delle icone meteo
  if(state.cities.weather[0].main === "Clouds") {
    imgCloud.classList.add('is_visible');
    imgSun.classList.remove('is_visible');
  }else{
    imgSun.classList.add('is_visible');
    imgCloud.classList.remove('is_visible');
  }
  console.log('----> state.cities.weather[0].main= ', state.cities.weather[0].main);

  textOutput2.textContent = `${state.cities.main.temp} C`;
  textOutput3.textContent = `${state.cities.main.temp_min} C`;
  textOutput4.textContent = `${state.cities.main.temp_max} C`;

  textInput.value = "";
  textInput.blur(); 
}

async function getRomeData() {
  const cityURL = getUrl('Rome');
  console.log("cityURL2= ", cityURL);
    try {
      const response = await fetch(cityURL);
      const result = await response.json();
  
      if (!response.ok) {
        throw (new Error(`Rome was not found`));
      } 
      state.rome = result;
      console.log("risultato chiamata ROMA positivo: ", result);
      
      renderRomeCard();

      console.log("state.rome: ", state.rome);
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  }
  document.addEventListener("DOMContentLoaded", getRomeData);

  function renderRomeCard() {
    const imgCloudRome = document.querySelector('#imgCloudRome');
    const imgSunRome = document.querySelector('#imgSunRome');
    const rometextOutput2 = document.querySelector('#rometextOutput2');
    const rometextOutput3 = document.querySelector('#rometextOutput3');
    const rometextOutput4 = document.querySelector('#rometextOutput4');
    //Logica per visualizzazione delle icone meteo
    if(state.rome.weather[0].main === "Clouds") {
      imgCloudRome.classList.add('is_visible');
      imgSunRome.classList.remove('is_visible');
    }else{
      imgSunRome.classList.add('is_visible');
      imgCloudRome.classList.remove('is_visible');
    }
  
    romeOutput2.textContent = `${state.rome.main.temp} C`;
    romeOutput3.textContent = `${state.rome.main.temp_min} C`;
    romeOutput4.textContent = `${state.rome.main.temp_max} C`; 
  }

  async function getLondonData() {
    const cityURL = getUrl('London');
    console.log("cityURL3= ", cityURL);
      try {
        const response = await fetch(cityURL);
        const result = await response.json();
    
        if (!response.ok) {
          throw (new Error(`London was not found`));
        } 
        console.log("risultato chiamata Londra positivo: ", result);
        state.london = result;
        console.log("state.london: ", state.london);

        renderLondonCard();

      } catch (errorMessage) {
        console.log(errorMessage);
      }
    }
    document.addEventListener("DOMContentLoaded", getLondonData);

    function renderLondonCard() {
      console.log('esegue renderLondonCard?');
      const imgCloudLondon = document.querySelector('#imgCloudLondon');
      const imgSunLondon = document.querySelector('#imgSunLondon');
      const londonOutput2 = document.querySelector('#londonOutput2');
      const londonOutput3 = document.querySelector('#londonOutput3');
      const londonOutput4 = document.querySelector('#londonOutput4');
      //Logica per visualizzazione delle icone meteo
      if(state.london.weather[0].main === "Clouds") {
        imgCloudLondon.classList.add('is_visible');
        imgSunLondon.classList.remove('is_visible');
      }else{
        imgSunLondon.classList.add('is_visible');
        imgCloudLondon.classList.remove('is_visible');
      }
      console.log('----> state.london.weather[0].main= ', state.london.weather[0].main);
    
      londonOutput2.textContent = `${state.london.main.temp} C`;
      londonOutput3.textContent = `${state.london.main.temp_min} C`;
      londonOutput4.textContent = `${state.london.main.temp_max} C`; 
    }

    async function getMadridData() {
      const cityURL = getUrl('Madrid');
      console.log("cityURL4= ", cityURL);
        try {
          const response = await fetch(cityURL);
          const result = await response.json();
      
          if (!response.ok) {
            throw (new Error(`Madrid was not found`));
          } 
          console.log("risultato chiamata Madrid positivo: ", result);  
          state.madrid = result;
          console.log("state.madrid: ", state.madrid);
          renderMadridCard();

        } catch (errorMessage) {
          console.log(errorMessage);
        }
      }
      document.addEventListener("DOMContentLoaded", getMadridData);

      function renderMadridCard() {
        const imgCloudMadrid = document.querySelector('#imgCloudMadrid');
        const imgSunMadrid = document.querySelector('#imgSunMadrid');
        const madridOutput2 = document.querySelector('#madridOutput2');
        const madridOutput3 = document.querySelector('#madridOutput3');
        const madridOutput4 = document.querySelector('#madridOutput4');
        //Logica per visualizzazione delle icone meteo
        if(state.madrid.weather[0].main === "Clouds") {
          imgCloudMadrid.classList.add('is_visible');
          imgSunMadrid.classList.remove('is_visible');
        }else{
          imgSunMadrid.classList.add('is_visible');
          imgCloudMadrid.classList.remove('is_visible');
        }
        console.log('----> state.madrid.weather[0].main= ', state.madrid.weather[0].main);
      
        madridOutput2.textContent = `${state.madrid.main.temp} C`;
        madridOutput3.textContent = `${state.madrid.main.temp_min} C`;
        madridOutput4.textContent = `${state.madrid.main.temp_max} C`; 
      }

      async function getNewYorkData() {
        const cityURL = getUrl('New York');
        console.log("cityURL5= ", cityURL);
          try {
            const response = await fetch(cityURL);
            const result = await response.json();
        
            if (!response.ok) {
              throw (new Error(`New York was not found`));
            } 
            console.log("risultato chiamata New York positivo: ", result);   
            state.newYork = result;
            console.log("state.newYork: ", state.newYork);

            renderNewYorkCard();

          } catch (errorMessage) {
            console.log(errorMessage);
          }
        }
        document.addEventListener("DOMContentLoaded", getNewYorkData);

        function renderNewYorkCard() {
          const imgCloudNewYork = document.querySelector('#imgCloudNewYork');
          const imgSunNewYork = document.querySelector('#imgSunNewYork');
          const newYorkOutput2 = document.querySelector('#newYorkOutput2');
          const newYorkOutput3 = document.querySelector('#newYorkOutput3');
          const newYorkOutput4 = document.querySelector('#newYorkOutput4');
          //Logica per visualizzazione delle icone meteo
          if(state.newYork.weather[0].main === "Clouds") {
            imgCloudNewYork.classList.add('is_visible');
            imgSunNewYork.classList.remove('is_visible');
          }else{
            imgSunNewYork.classList.add('is_visible');
            imgCloudNewYork.classList.remove('is_visible');
          }
          console.log('----> state.newYork.weather[0].main= ', state.newYork.weather[0].main);
        
          newYorkOutput2.textContent = `${state.newYork.main.temp} C`;
          newYorkOutput3.textContent = `${state.newYork.main.temp_min} C`;
          newYorkOutput4.textContent = `${state.newYork.main.temp_max} C`; 
        }

