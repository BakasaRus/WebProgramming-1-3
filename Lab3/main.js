let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
splitX = randomInt(25, 75) * 10;
splitY = randomInt(25, 75) * 10;

addImage(splitX, splitY, 0, 0);
addImage(canvas.width - splitX, splitY, splitX, 0);
addImage(splitX, canvas.height - splitY, 0, splitY);
addImage(canvas.width - splitX, canvas.height - splitY, splitX, splitY);

let info = getQuote()
let quote = info.quote, author = info.character;
console.log(quote, author);

document.body.appendChild(canvas);

function addImage(sizeX, sizeY, offsetX, offsetY) {
    let img = new Image();
    img.src = `https://source.unsplash.com/collection/1127163/${sizeX}x${sizeY}`;
    img.crossOrigin = 'anonymous';
    img.onload = () => { 
        context.drawImage(img, offsetX, offsetY); 
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(offsetX, offsetY, sizeX, sizeY);
    };
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getQuote() {
    let quote = "";
    $.get({
        async: false,
        url: "https://thesimpsonsquoteapi.glitch.me/quotes"
    }).done(r => quote = r[0]);
    return quote;
}

// let images = [];
// $.get("https://api.unsplash.com//photos/random?client_id=86fae76b3bed787ddb8633d637862137c6aba016e422387916e7c2e88857304d&count=4")
// .done(data => images = data);

