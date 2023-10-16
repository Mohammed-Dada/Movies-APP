'use strict';

import { api_key, fetchDataFormServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMmovieCard } from "./movie-card.js";
import { search } from "./search.js";

// collectc genre name & url parameter from local storage
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();

let currntPage = 1;
let totalPages = 0;

fetchDataFormServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currntPage}&${urlParam}`,
    function ({ results: movieList, total_pages}) {
        totalPages = total_pages;

        document.title = `${genreName} Movies - Tvflix`;

        const movieListElem = document.createElement("section");
        movieListElem.classList.add("movie-list", "genre-list");
        movieListElem.ariaLabel = `${genreName} Movies`;

        movieListElem.innerHTML = `
            <div class="title-wrapper">
                <h1 class="heading">All ${genreName} Movies</h1>
            </div>

            <div class="grid-list"></div>

            <button class="btn load-more" load-more>Load More</button>
        `;

        
        // add movie card based on fetched item
        for (const movie of movieList) {
            const movieCard = createMmovieCard(movie);

            movieListElem.querySelector(".grid-list").appendChild(movieCard);
        }

        pageContent.appendChild(movieListElem);

        // load more button functionality 
        document.querySelector("[load-more]").addEventListener("click", function () {
            
            if (currntPage >= totalPages) {
                this.style.display = "none"; // this == loading-btn
                return;
            }

            currntPage++;
            this.classList.add("loading"); // this == loading-btn

            fetchDataFormServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currntPage}&${urlParam}`,
                ({ results: movieList}) => {
                this.classList.remove("loading"); // this == loading-btn

                for (const movie of movieList) {
                    const movieCard = createMmovieCard(movie);

                    movieListElem.querySelector(".grid-list").appendChild(movieCard);
                }
            });

        });

});

search();
