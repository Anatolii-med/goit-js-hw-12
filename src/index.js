import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTemplate from './templates/country_card.hbs';
import countryTemplate from './templates/country.hbs';
import { fetchCountries } from './fetchCountries';

import { Info, Failure } from '../node_modules/notiflix/src/notiflix';

const DEBOUNCE_DELAY = 300;

const findCountryField = document.querySelector('#search-box');
const countryCardInfo = document.querySelector('.country-info');
const countryListArea = document.querySelector('.country-list');

findCountryField.addEventListener('input', debounce(onInputCountryName, DEBOUNCE_DELAY));

function onInputCountryName(event) {
  const inp = event.target.value;
  fetchCountries(inp)
    .then(countries => {
      if (countries.length > 10) {
        countryCardInfo.innerHTML = '';
        countryListArea.innerHTML = '';
        alarmToMuchCountries();
      }

      if (countries.length === 1) {
        countryListArea.innerHTML = '';
        renderCountryCard(countries);
      }

      if (countries.length >= 2 && countries.length <= 10) {
        countryCardInfo.innerHTML = '';
        renderCountryList(countries);
      }
    })
    .catch(error => alarmBullShit());
}

function renderCountryList(list) {
  countryListArea.innerHTML = countryTemplate(list);
}

function renderCountryCard(card) {
  countryCardInfo.innerHTML = countryCardTemplate(card);
}

function alarmToMuchCountries(arr) {
  console.log(55555555555555555);
}

function alarmBullShit(arr) {
  console.log(666666666666666);
}
