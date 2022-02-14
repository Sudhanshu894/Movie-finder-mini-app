let key = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.ascen&api_key=785de1daa82425f46bf058e1acf45ab0"

let popular = document.querySelector('.popular-div');
let trending = document.querySelector('.trending-div');
getpopular();
async function getpopular(){
    let key = "785de1daa82425f46bf058e1acf45ab0";
    let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${key}`
    let res = await fetch(url);
    let data = await res.json();
    let popularmovies = data.results;
    console.log(popularmovies);
    displaypopular(popularmovies);
}
var itemdetails;
function displaypopular(popularmovies){
    let poplr = document.createElement('div');
    poplr.setAttribute('class','popular');
    popularmovies.map(function(item,index){
        let moviediv = document.createElement('div');
        moviediv.setAttribute('class','moviediv');
        moviediv.addEventListener('click',function(){
          itemdetails = [];
          itemdetails.push(item);
          localStorage.setItem('itemdetails',JSON.stringify(itemdetails));
          window.location.href = 'info.html';
        })
        let posterdiv = document.createElement('div');
        posterdiv.setAttribute('class','posterdiv');
        let poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        posterdiv.append(poster);
        moviediv.append(posterdiv);
        poplr.append(moviediv);
    })
    popular.append(poplr);
}
let counter = 0;
let leftarrow = document.querySelector('.left i')
leftarrow.addEventListener('click',function(){
    counter -= 270;
    if(counter < 0){
        counter = 0;
    }
    document.querySelector('.popular').style.right = `${counter}px`;
})
let rightarrow = document.querySelector('.right i');
rightarrow.addEventListener('click',function (){
    counter += 250;
    if (counter > 3760){
        counter = 3760;
    }
    document.querySelector('.popular').style.right = `${counter}px`
})
gettrendy();
async function gettrendy(){
    let key = "785de1daa82425f46bf058e1acf45ab0";
    let url = `https://api.themoviedb.org/3/trending/movie/week?&api_key=${key}`
    let result = await fetch(url);
    let movies = await result.json();
    let trendingmovies = movies.results;
    console.log(trendingmovies);
    displaytrending(trendingmovies);
}
function displaytrending(trendingmovies){
    let trend = document.createElement('div');
    trend.setAttribute('class','trend');
    trendingmovies.map(function(item,index){
        let moviediv = document.createElement('div');
        moviediv.setAttribute('class','moviediv');
        moviediv.addEventListener('click',function(){
          itemdetails = [];
          itemdetails.push(item);
          localStorage.setItem('movieinfo',JSON.stringify(itemdetails));
          window.location.href = 'info.html';
        })
        let posterdiv = document.createElement('div');
        posterdiv.setAttribute('class','posterdiv2');
        let poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        posterdiv.append(poster);
        // let namediv = document.createElement('div');
        // namediv.setAttribute('class','namediv');
        // let name = document.createElement('p');
        // name.textContent = item.Title;
        // let rating = document.createElement('p');
        // rating.textContent = item.vote_average;
        // namediv.append(name,rating);
        let infodiv = document.createElement('div');
        infodiv.setAttribute('class','infodiv');
        let overview = document.createElement('h2');
        overview.textContent = "Overview";
        let plot = document.createElement('p');
        plot.textContent = item.overview;
        infodiv.append(overview,plot);
        moviediv.append(posterdiv,infodiv);
        trend.append(moviediv);
    })
    trending.append(trend);
}
let count = 0;
let leftarrow1 = document.querySelector('.left1 i')
leftarrow1.addEventListener('click',function(){
    count -= 270;
    if(count < 0){
        count = 0;
    }
    document.querySelector('.trend').style.right = `${count}px`;
})
let rightarrow1 = document.querySelector('.right1 i');
rightarrow1.addEventListener('click',function (){
    count += 250;
    if (count > 3760){
        count = 3760;
    }
    document.querySelector('.trend').style.right = `${count}px`
})
let searchdiv = document.querySelector('.search-result');

var timerId;
  const searchMovies = async(name) =>{
    searchdiv.innerHTML = null;

    let response = await fetch(
      `https://www.omdbapi.com/?s=${name}&apikey=d806bd70`
    );

    let data = await response.json();
    console.log(data.Search);
    return data.Search;
  }

  const appendMovies = async(m)=> {
    if (m === undefined) {
      return false;
    }

    m.forEach(function(item){
      let p = document.createElement("p");

      p.innerText = item.Title;
      p.setAttribute("class",'ptag');

      searchdiv.append(p);
    });
  }

  const throttleFunction = (func, delay) => {
    // If setTimeout is already scheduled, no need to do anything
    if (timerId) {
      clearTimeout(timerId);
    }

    // Schedule a setTimeout after delay seconds
    timerId = setTimeout(() =>  {
      func();
    }, delay);
  }

  const main = async() => {
    let name = document.getElementById('movie_name').value;
    if (name.length <= 2) {
      return false;
    }

    let m = await searchMovies(name);

    appendMovies(m);
  }
  let inputbox = document.getElementById('movie_name');
  document.querySelector('.search-result').addEventListener('mouseleave',function(){
      searchdiv.innerHTML = null;
      document.querySelector('.search-result').style.display = 'none';
  })
  inputbox.addEventListener('mouseenter',function(){
    document.querySelector('.search-result').style.display = 'block';
})
