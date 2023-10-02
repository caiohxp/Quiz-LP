var library;
var gabarito;

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function refreshQuestion() {
    readTextFile("library.json", function (text) {
        var data = JSON.parse(text)
        var num = Math.floor(Math.random() * data.length)
        library = data[num];
    });
    var escolhido = false;
    var pergunta = document.querySelector("#pergunta");
    pergunta.innerHTML = library.pergunta;
    var respostas = document.querySelectorAll(".resposta p");
    var array = [];
    gabarito = []
    array.push(library.r1, library.r2, library.r3, library.r4);
    respostas.forEach((r, i) => {
        itemremove = Math.floor(Math.random() * array.length);
        r.innerHTML = array[itemremove].texto;
        gabarito.push(array[itemremove].gabarito);
        array.splice(itemremove, 1);
        if(r.parentElement.style.background == "yellow" || r.parentElement.style.background == "crimson")
            r.parentElement.style.background = "rgb(0, 128, 75)";
        r.parentElement.addEventListener("click", function () {
            if(!escolhido)
                if (gabarito[i]) {
                    r.parentElement.style.background = "yellow";
                    escolhido = true;
                } else {
                    r.parentElement.style.background = "crimson";
                    escolhido = true;
                }
        });
    })
}

