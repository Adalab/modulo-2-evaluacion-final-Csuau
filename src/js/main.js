'use strict';

const searchBtn = document.querySelector('.js_searchBtn');
const userSearch = document.querySelector('.js_userSearch');
const resultList = document.querySelector('.js_resultList');
const favoritesList = document.querySelector('.js_favoritesList');
const resetBtn = document.querySelector('.js_resetBtn');
const urlImgNotFound = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
const defaultImg = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;

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

            data.forEach(({ title, images: { jpg: { image_url } }, mal_id }) => {
                renderResults(title, checkImg(image_url), mal_id);

            });

        });
}
function checkImg (image_url) {
    if (image_url === urlImgNotFound) {

        return defaultImg;

    }
    return image_url;
}
function createHtml (title, image_url, id) {
    const liElement = document.createElement('li');
    liElement.dataset.id = id;

    const divResult = document.createElement("div");
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", image_url);
    const h2Element = document.createElement("h2");
    const titleResult = document.createTextNode(title);
    h2Element.appendChild(titleResult);
    liElement.appendChild(h2Element);
    liElement.appendChild(divResult);
    divResult.appendChild(imgElement);
    return liElement;
}
function renderResults (title, image_url, id) {

    const liElement = createHtml(title, image_url, id);
    if (localStorage.getItem(id)) {
        liElement.classList.add('favorite')
    }
    resultList.appendChild(liElement);
    liElement.addEventListener('click', addFavorites);


}
function addFavorites (ev) {
    const element = ev.currentTarget;
    const title = element.querySelector('h2').innerHTML;
    const img = element.querySelector('img').src;
    const id = element.dataset.id;


    if (!localStorage.getItem(id)) {
        localStorage.setItem(id, JSON.stringify({ title, img }));
        const liElement = createHtml(title, img, id);
        favoritesList.appendChild(liElement);
    }
    else {
        localStorage.removeItem(id);
        const itemRemove = favoritesList.querySelector(`[data-id="${id}"]`);
        itemRemove.remove();
    }
    element.classList.toggle('favorite');
}
function renderFavorites () {
    const items = { ...localStorage };
    Object.keys(items).forEach(id => {
        const data = JSON.parse(items[id]);
        const element = createHtml(data.title, data.img, id);
        favoritesList.appendChild(element);
    })


}

searchBtn.addEventListener('click', manejadora);
renderFavorites();

