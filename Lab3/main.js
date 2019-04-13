let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
splitX = randomInt(3, 5) * 100;
splitY = randomInt(3, 5) * 100;

addImage(splitX, splitY, 0, 0);
addImage(canvas.width - splitX, splitY, splitX, 0);
addImage(splitX, canvas.height - splitY, 0, splitY);
addImage(canvas.width - splitX, canvas.height - splitY, splitX, splitY);

function addImage(sizeX, sizeY, offsetX, offsetY) {
    let img = new Image();
    img.src = getRandomImage(1127163, sizeX, sizeY);
    img.crossOrigin = 'anonymous';
    context.drawImage(img, offsetX, offsetY);
    document.body.appendChild(img);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomImage(collection, width, height) {
    return `https://source.unsplash.com/collection/${collection}/${width}x${height}`;
}

function getQuote() {
    let quote = "";
    $.get("https://thesimpsonsquoteapi.glitch.me/quotes")
    .done(data => quote = data[0].quote);
    return quote;
}

// let images = [];
// $.get("https://api.unsplash.com//photos/random?client_id=86fae76b3bed787ddb8633d637862137c6aba016e422387916e7c2e88857304d&count=4")
// .done(data => images = data);

