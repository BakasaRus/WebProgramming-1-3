let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
splitX = randomInt(25, 75) * 10;
splitY = randomInt(25, 75) * 10;

addImage(splitX, splitY, 0, 0)
    .then(addImage(canvas.width - splitX, splitY, splitX, 0))
    .then(addImage(splitX, canvas.height - splitY, 0, splitY))
    .then(addImage(canvas.width - splitX, canvas.height - splitY, splitX, splitY))
    .then(loadQuote)
    .then(response => writeQuote(response))
    .then(document.body.appendChild(canvas));


function writeQuote(quote) {
    console.log(quote);
    context.textAlign = 'center';
    context.font = 'Bold 24px Arial';
    context.fillStyle = "white";
    context.fillText(quote.quoteText, 500, 500, 1000);
}

function loadQuote() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://api.forismatic.com/api/1.0/",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
                method: "getQuote",
                lang: "ru",
                format: "jsonp"
            }
        })
            .done(resolve);
    });
}

function addImage(sizeX, sizeY, offsetX, offsetY) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            console.log(img.src);
            context.drawImage(img, offsetX, offsetY);
            context.fillStyle = "rgba(0, 0, 0, 0.5)";
            context.fillRect(offsetX, offsetY, sizeX, sizeY);
            resolve("OK");
        }
        img.src = `https://source.unsplash.com/collection/1127163/${sizeX}x${sizeY}`;
    });
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// let images = [];
// $.get("https://api.unsplash.com//photos/random?client_id=86fae76b3bed787ddb8633d637862137c6aba016e422387916e7c2e88857304d&count=4")
// .done(data => images = data);

