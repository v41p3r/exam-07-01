const URL = "https://dog.ceo/api/breeds/image/random";

// this URL is for testing purposes to simulate failing request
const failedRequest = "https://wronUrl.dog.ceo/api/breeds/image/random";
// this URL is for testing purposes to simulate successful request, but falsy status
const falsyResponseStatus = "https://dog.ceo/api/breeeeeds/image/random";

const btn = document.getElementById("fetch-data-btn");
const left = document.getElementById('left');
const right = document.getElementById('right');

function createFav(url) {
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.addEventListener('click', () => img.remove());
    return img;
}

function addFav(url) {
    const img = createFav(url);
    right.appendChild(img);
    img.scrollIntoView();
}

function updateUI(url) {
    left.innerHTML = '';

    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.addEventListener('click', () => {
        addFav(url);
        img.remove();
    });

    left.appendChild(img);
}


async function fetchData() {

    btn.textContent = 'loading...';
    btn.setAttribute('disabled', 'not true');

    try {
        const result = await fetch(URL).then(res => res.json());

        if (result.status === "error")
            alert(result.message);
        else updateUI(result.message);
        console.log(result);
    }
    catch (e) {
        alert(e);
    }

    btn.textContent = 'FETCH';
    btn.removeAttribute('disabled');
}


btn.addEventListener('click', fetchData);
