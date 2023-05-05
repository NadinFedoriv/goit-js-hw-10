import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
const searchCountry = evt.target.value.trim();

if (!searchCountry) {
    list.innerHTML = "";
  info.innerHTML = "";
    return;
}
fetchCountries(searchCountry)
  .then(countries => {
    if (countries.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    }
    if (countries.length === 1) {
      info.innerHTML = createMarkupDetail(countries);
      list.innerHTML = "";
      return;
    }

    list.innerHTML = createMarkup(countries);
    info.innerHTML = "";
  })
.catch(error => console.log(error));
};


function createMarkup(arr) {

return arr.map(country => `<li class="country-item">
<img class="county-flag" src="${country.flags.svg}" alt="${country.name.official}" width="30px" height="20px">
<span>${country.name.official}</span>      
</li>`
)
.join('');
};

function createMarkupDetail(arr) {
  console.log(arr);
    return arr.map(country => `<div class="country-title"><img class="county-flag" src="${country.flags.svg}" alt="${country.name.official}" width="30px" height="20px"> <h2>${country.name.official}</h2></div>
    <ul class="country-info">
      <li><p class="info-data"><span class="info-subtitle">Capital: </span> ${country.capital}</p>
    </li>
    <li><p class="info-data"><span class="info-subtitle">Population: </span> ${country.population}</p>
    </li>
    <li><p class="info-data"><span class="info-subtitle">Languages: </span> ${Object.values(country.languages)}</p>
    </li>
  </ul>`
    )
    .join('');
    };



