import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const URL="https://restcountries.com/v3.1"


function fetchCountries(name){
    return fetch(`${URL}/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response=>response.json())
}

