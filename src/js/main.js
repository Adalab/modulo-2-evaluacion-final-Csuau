'use strict';

console.log('>> Ready :)');
const searchBtn = document.querySelector('.js_searchBtn');
const userSearch = document.querySelector('.js_userSearch');
const resultList = document.querySelector('.js_resultList');
const favoritesList = document.querySelector('.js_favoriteList');
const resetBtn = document.querySelector('.js_resetBtn');

function manejadora (ev) {
    ev.preventDefault();
    const value = userSearch.value;
    if (value) {
        getItems(value);
    }
}
function getItems (value) {
    console.log('tester');
    fetch(`https://api.jikan.moe/v4/anime?q=${value}`)
        .then((response) => response.json())
        .then(({ data }) => {

            data.forEach(({ title, images }) => {
                renderResults(title);

            });

        });
}
function renderResults (title) {
    const liElement = document.createElement('li');
    // liElement.classList.add('');
    liElement.innherText = title;



}
searchBtn.addEventListener('click', manejadora);

