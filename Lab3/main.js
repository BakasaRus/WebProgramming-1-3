let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
splitX = randomInt(25, 75) * 10;
splitY = randomInt(25, 75) * 10;

Promise.all([
    addImage(splitX, splitY, 0, 0),
    addImage(canvas.width - splitX, splitY, splitX, 0),
    addImage(splitX, canvas.height - splitY, 0, splitY),
    addImage(canvas.width - splitX, canvas.height - splitY, splitX, splitY),
    loadQuote()
])
    .then(response => writeQuote(response[4]))
    .then(document.body.appendChild(canvas))
    .then(save);

function save() {
    var link = document.createElement("a");
    link.innerHTML = "Скачать";
    link.setAttribute('download', 'Collage.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    document.body.appendChild(link);
    link.click();
}

function writeQuote(quote) {
    context.textAlign = 'center';
    context.textBaseline = "middle"; 
    context.font = 'Bold 60px Arial';
    context.fillStyle = "white";

    let words = quote.quoteText.split(' ');
    let lines = []
    while (words.length > 0) {
        let line = [];
        while (context.measureText(line.join(' ')).width < canvas.width * 0.9 && words.length > 0) {
            line.push(words.shift());
        }

        if (context.measureText(line.join(' ')).width >= canvas.width * 0.9)
            words.unshift(line.pop());

        lines.push(line);
    }
    let height = 500 - lines.length * 30 + 30;
    lines.forEach((line, i) => {
        context.fillText(line.join(' '), 500, height + i * 60);
    });
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
        }).done(response => resolve(response));
    });
}

function addImage(sizeX, sizeY, offsetX, offsetY) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            context.drawImage(img, offsetX, offsetY);
            context.fillStyle = "rgba(0, 0, 0, 0.5)";
            context.fillRect(offsetX, offsetY, sizeX, sizeY);
            resolve("OK, " + img.src);
        }
        img.src = `https://source.unsplash.com/collection/1127163/${sizeX}x${sizeY}`;
    });
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}