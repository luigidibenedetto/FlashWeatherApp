/**
Layout
E necessario creare una input text HTML che permetta di digitare il nome di una città. L’API
va richiamata al click su un pulsante posto accanto all’input di text. Quando si atterra sulla
pagina, prevedere una visualizzazione a “card” del meteo di queste 4 città: Roma, Londra,
Madrid, New York.
*/

const state = {
  config: {
    api_key: "81abe82ed06ba133fa0b2c72305a7650",
    base_url: "https://api.themoviedb.org/3",
    images: null
  },
  movies: null
};

/**
 * Utilities
 */
function getUrl(pathName) {
  const { api_key, base_url } = state.config;

  return `${base_url}${pathName}?api_key=${api_key}`;
}

function getImageUrl(imgPath) {
  // const { secure_base_url, backdrop_sizes } = state.config.images

  const secure_base_url = state.config.images.secure_base_url;
  const backdrop_sizes = state.config.images.backdrop_sizes;

  return `${secure_base_url}${backdrop_sizes[0]}${imgPath}`;
}

async function getData(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    return result;
  } catch (errorMessage) {
    console.log(errorMessage);
  }
}

/**
 * Actions per caricare i dati
 
 * ottiene i la lista di film più popolari
 *
 * @link https://developers.themoviedb.org/3/movies/get-popular-movies
 * 
 * top rated:
 * https://developers.themoviedb.org/3/movies/get-top-rated-movies
 * 
 * pop series:
 * https://developers.themoviedb.org/3/tv/get-popular-tv-shows
 */
async function getPopularMovies() {
  const popularMoviesURL = getUrl("/movie/popular");

  const rawResponse = await getData(popularMoviesURL);

  state.movies = rawResponse.results;

  return rawResponse;
}

async function getTopRatedMovies() {
    const topRatedURL = getUrl("/movie/top_rated");
  
    const rawResponse = await getData(topRatedURL);
  
    state.movies = rawResponse.results;
  
    return rawResponse;
  }
  
async function getPopularSeries() {
    const popSeriesURL = getUrl("/tv/popular");

    const rawResponse = await getData(popSeriesURL);

    state.movies = rawResponse.results;

    return rawResponse;
}


/**
 * Crea una card per i film / serie tv
 */
function getMovieCard(imgURL, title) {
  const cardWrap = document.createElement("div");
  const coverImg = document.createElement("img");

  const textWrap = document.createElement("div");
  const text = document.createElement("h3");
  

  cardWrap.classList.add("card");
  textWrap.classList.add("card__title_wrap");

  text.textContent = title;
  coverImg.src = imgURL;

  textWrap.appendChild(text);
  cardWrap.append(coverImg, textWrap);

  cardWrap.addEventListener("click", overlay, {
    once: true
  });

  return cardWrap;
}

/**
 * genera le card per i film presenti nel parametro "list"
 * e li appende dentro il nodo parent passato come secondo parametro
 * "sectionNode"
 */
function renderCarousel(list, sectionNode) {
  list.forEach((item) => {
    // ottiene la url dell'immagine completa
    const imgURL = getImageUrl(item.backdrop_path);

    const movieCard = getMovieCard(imgURL, item.title);

    sectionNode.appendChild(movieCard);
  });
}

/**
 * funzione che ottiene i dati dall'eseterno,
 * e quando li ha ottenuti renderizza il carosello dei film popolari
 */
function handleHTMLMounted() {
  Promise.all([handleSession(), getConfiguration(), getPopularMovies()]).then(
    () => {
      // ci permette di lavorare con i dati ottenuti dall'esterno
      renderCarousel(state.movies, POPULAR_MOVIES);
    }
  );
}

function handleHTMLMounted2() {
    Promise.all([handleSession(), getConfiguration(), getTopRatedMovies()]).then(
      () => {
        // ci permette di lavorare con i dati ottenuti dall'esterno
        renderCarousel(state.movies, TOPRATED_MOVIES);
      }
    );
}

function handleHTMLMounted3() {
    Promise.all([handleSession(), getConfiguration(), getPopularSeries()]).then(
      () => {
        // ci permette di lavorare con i dati ottenuti dall'esterno
        renderCarousel(state.movies, POPULAR_SERIES);
      }
    );
}


/**
 * listener sul lifecycle "DOMContentLoaded"
 *
 * esegue la funzione handleHTMLMounted appena l'html del nostro
 * index.html è stato stampato a video
 *
 * rimuove il listenr una volta terminata l'operazione con {once: true}
 */
document.addEventListener("DOMContentLoaded", handleHTMLMounted, {
  once: true
});

document.addEventListener("DOMContentLoaded", handleHTMLMounted2, {
    once: true
});

document.addEventListener("DOMContentLoaded", handleHTMLMounted3, {
    once: true
});
