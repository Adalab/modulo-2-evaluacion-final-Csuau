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

            data.forEach(({ title, images: { jpg: { image_url } } }) => {
                renderResults(title, image_url);
                console.log(image_url);
            });

        });
}
function renderResults (title, image_url) {
    const liElement = document.createElement('li');
    // liElement.classList.add('');


    const divResult = document.createElement("div");
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", image_url);
    const h2Element = document.createElement("h2");
    const titleResult = document.createTextNode(title);
    h2Element.appendChild(titleResult);
    liElement.appendChild(h2Element);
    liElement.appendChild(divResult);
    divResult.appendChild(imgElement);
    resultList.appendChild(liElement);


}
searchBtn.addEventListener('click', manejadora);

