let searchdiv = document.querySelector(".search-result");
var timerId;
async function searchMovies(name) {
  searchdiv.innerHTML = null;

  let response = await fetch(
    `https://www.omdbapi.com/?s=${name}&apikey=d806bd70`
  );

  let data = await response.json();
  console.log(data.Search);
  return data.Search;
}

async function appendMovies(m) {
  if (m === undefined) {
    return false;
  }

  m.forEach(function (item) {
    let p = document.createElement("p");

    p.innerText = item.Title;
    p.setAttribute("class", "ptag");

    searchdiv.append(p);
  });
}

function throttleFunction(func, delay) {
  // If setTimeout is already scheduled, no need to do anything
  if (timerId) {
    clearTimeout(timerId);
  }

  // Schedule a setTimeout after delay seconds
  timerId = setTimeout(function () {
    func();
  }, delay);
}

async function main() {
  let name = document.getElementById("movie_name").value;
  if (name.length <= 2) {
    return false;
  }

  let m = await searchMovies(name);

  appendMovies(m);
}
let inputbox = document.getElementById("movie_name");
document
  .querySelector(".search-result")
  .addEventListener("mouseleave", function () {
    searchdiv.innerHTML = null;
    document.querySelector(".search-result").style.display = "none";
  });
inputbox.addEventListener("mouseenter", function () {
  document.querySelector(".search-result").style.display = "block";
});
let movieinfo = JSON.parse(localStorage.getItem("movieinfo"));
let maincontainer = document.querySelector(".movie-container");
displaymovieinfo(movieinfo);
function displaymovieinfo(movieinfo) {
  let imgdiv = document.createElement("div");
  imgdiv.setAttribute("class", "imgdiv");
  let img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500${movieinfo[0].poster_path}`;
  imgdiv.append(img);

  let contentdiv = document.createElement("div");
  contentdiv.setAttribute("class", "contentdiv");
  let title = document.createElement("h1");
  title.textContent = `${movieinfo[0].title} (${movieinfo[0].release_date})`;
  contentdiv.append(title);
  let aboutdiv = document.createElement("div");
  aboutdiv.setAttribute("class", "about");
  let about = document.createElement("p");
  about.textContent = "Overview";
  let desc = document.createElement("p");
  desc.textContent = movieinfo[0].overview;
  aboutdiv.append(about, desc);
  contentdiv.append(aboutdiv);
  let lang = document.createElement("div");
  lang.setAttribute("class", "lang");
  let langp = document.createElement("p");
  langp.textContent = `Language - ${movieinfo[0].original_language}glish`;
  lang.append(langp);
  contentdiv.append(lang);
  let ratings = document.createElement("div");
  ratings.setAttribute("class", "ratings");
  let ratinghead = document.createElement("p");
  ratinghead.textContent = "IMdb Ratings - ";
  // console.log("hello");
  let ratingp = document.createElement("span");
  ratingp.textContent = `${movieinfo[0].vote_average} (${movieinfo[0].vote_count} K)`;
  ratinghead.append(ratingp);
  ratings.append(ratinghead);
  contentdiv.append(ratings);
  console.log(movieinfo[0]);
  maincontainer.append(imgdiv, contentdiv);
}