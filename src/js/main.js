'use strict';

const searchBtn = document.querySelector('.js_searchBtn');
const userSearch = document.querySelector('.js_userSearch');
const resultList = document.querySelector('.js_resultList');
const favoritesList = document.querySelector('.js_favoritesList');
const resetBtn = document.querySelector('.js_resetBtn');
const resetBtnFav = document.querySelector('.js_resetBtnFavorite');
const urlImgNotFound = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
const defaultImg = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;
let favorites = [];

function getItems (ev) {
    ev.preventDefault();

    fetch(`https://api.jikan.moe/v4/anime?q=${userSearch.value}`)
        .then((response) => response.json())
        .then(({ data }) => {
            data.forEach(({ title, images: { jpg: { image_url } }, mal_id, type }) => {
                renderResults(title, checkImg(image_url), mal_id, type);
            });
        });
}

function checkImg (image_url) {
    if (image_url === urlImgNotFound) {
        return defaultImg;
    }
    return image_url;
}

function createHtml (title, image_url, id, type) {
    const liElement = document.createElement('li');
    liElement.classList.add("liContainer")
    liElement.dataset.id = id;
    const paragraph = document.createElement('p');
    const typeElement = document.createTextNode(type);
    paragraph.appendChild(typeElement);
    liElement.appendChild(paragraph);
    const divResult = document.createElement("div");
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", image_url);
    const h2Element = document.createElement("h2");
    const titleResult = document.createTextNode(title);
    h2Element.appendChild(titleResult);
    liElement.appendChild(h2Element);
    liElement.appendChild(divResult);
    divResult.appendChild(imgElement);
    if (type === 'Special') {
        const paragraphSpecial = document.createElement('p');
        const hSpecial = document.createTextNode('historia especial');
        paragraphSpecial.appendChild(hSpecial);
        liElement.appendChild(paragraphSpecial);


    }
    return liElement;
}

function renderResults (title, image_url, id, type) {
    const liElement = createHtml(title, image_url, id, type);

    if (favorites.find(item => parseInt(item.id) === id)) {
        liElement.classList.add('favorite');
    }

    resultList.appendChild(liElement);
    liElement.addEventListener('click', addFavorites);
}

function addFavorites (ev) {
    const element = ev.currentTarget;
    const title = element.querySelector('h2').innerHTML;
    const img = element.querySelector('img').src;
    const id = element.dataset.id;

    const itemFavorite = favorites.findIndex(item => item.id === id);
    if (itemFavorite === -1) {
        favorites.push({ id, title, img })
        renderFavorite(title, img, id);
        console.log(title);
    } else {
        favorites.splice(itemFavorite, 1);
        removeFavorite(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    element.classList.toggle('favorite');
    toggleResetBtnFavorites();
}

function renderFavorites () {
    const items = localStorage.getItem('favorites');
    if (items) {
        JSON.parse(items).forEach(({ id, title, img }) => {
            favorites.push({ id, title, img })
            renderFavorite(title, img, id);
        })
        toggleResetBtnFavorites();
    }
}

function toggleResetBtnFavorites () {
    if (favorites.length > 0 && resetBtnFav.classList.contains('hidden')) {
        resetBtnFav.classList.remove('hidden');
        resetBtnFav.addEventListener('click', resetLocalStorage);
    } else if (favorites.length === 0) {
        resetBtnFav.classList.add('hidden');
    }
}

function resetLocalStorage () {
    favorites.forEach(item => removeFavorite(item.id));
    localStorage.removeItem('favorites');
    favorites = [];
    favoritesList.innerHTML = null;
    resetBtnFav.classList.add('hidden');
}

function renderFavorite (title, img, id) {
    const liElement = createHtml(title, img, id);
    const btnRemove = document.createElement("span");
    btnRemove.innerText = 'x';
    btnRemove.classList.add('btnRemove');
    btnRemove.dataset.id = id;
    btnRemove.addEventListener('click', checkIdRemove);
    liElement.appendChild(btnRemove);
    favoritesList.appendChild(liElement);
}

function checkIdRemove (ev) {
    const element = ev.currentTarget;
    const id = element.dataset.id;
    const itemFavorite = favorites.findIndex(item => item.id === id);



    if (itemFavorite !== -1) {
        favorites.splice(itemFavorite, 1);
        removeFavorite(id);
        localStorage.setItem('favorites', JSON.stringify(favorites))

    }

}

function removeFavorite (id) {
    const itemRemove = favoritesList.querySelector(`[data-id="${id}"]`);
    itemRemove.remove();
    const itemResultFav = resultList.querySelector(`[data-id="${id}"]`);
    if (itemResultFav) {
        itemResultFav.classList.remove('favorite');
    }

}

searchBtn.addEventListener('click', getItems);
renderFavorites();

