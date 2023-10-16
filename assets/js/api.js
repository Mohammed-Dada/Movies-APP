'use strict';

const api_key = 'd6571f1571a1f6f8067b40d27a9c502c';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

// Fetch Data Form a Server Using The 'URL And Passes 
// The Result In JSON Data To a 'Callback' Function,
// Along With An Optional Parameter If Has 'Optionalparam'.

const fetchDataFormServer = function (url, callback, optionalParam) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}

export { imageBaseURL, api_key, fetchDataFormServer };