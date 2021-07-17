import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTemplate from './templates/country_card.hbs';
import countryTemplate from './templates/country.hbs';
import { fetchCountries } from './fetchCountries';

import Notiflix from 'notiflix';

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
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function alarmBullShit(arr) {
  Notiflix.Notify.failure('Oops, there is no country with that name, buy the globe');
}
