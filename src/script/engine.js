const emojis = ["😀", "😀", "😁", "😁", "😂", "😂", "🤣", "🤣", "😃", "😃", "😄", "😄", "😅", "😅", "😆", "😆", "😉", "😉", "😊", "😊", "😋", "😋", "😎", "😎", "😍", "😍", "😘", "😘", "🥰", "🥰", "😗", "😗", "😙", "😙", "😚", "😚", "🙂", "🙂", "🤗", "🤗", "🤩", "🤩", "🤔", "🤔", "🤨", "🤨", "😐", "😐", "😑", "😑", "😶", "😶", "🙄", "🙄", "😏", "😏", "😣", "😣", "😥", "😥", "😮", "😮", "🤐", "🤐", "😯", "😯", "😪", "😪", "😫", "😫", "🥱", "🥱", "😴", "😴", "😌", "😌", "😛", "😛", "😜", "😜", "😝", "😝", "🤤", "🤤", "😒", "😒", "😓", "😓", "😔", "😔", "😕", "😕", "🙃", "🙃", "🤑", "🤑", "😲", "😲", "🙁", "🙁", "😖", "😖", "😞", "😞", "😟", "😟", "😤", "😤", "😢", "😢", "😭", "😭", "😦", "😦", "😧", "😧", "😨", "😨", "😩", "😩", "🤯", "🤯", "😬", "😬", "😰", "😰", "😱", "😱", "🥵", "🥵", "🥶", "🥶", "😳", "😳", "🤪", "🤪", "😵", "😵", "🥴", "🥴", "😠", "😠", "😡", "😡", "🤬", "🤬", "😷", "😷", "🤒", "🤒", "🤕", "🤕", "🤢", "🤢", "🤮", "🤮", "🤧", "🤧", "😇", "😇", "🥳", "🥳", "🥺", "🥺", "🤠", "🤠", "🤡", "🤡", "🤥", "🤥", "🤫", "🤫", "🤭", "🤭", "🧐", "🧐", "🤓", "🤓", "😈", "😈", "👿", "👿"
];


let qttCard = 4;
let fase = 1;

const btnMenu = document.querySelector(".btnMenu");
const popupDiv = document.createElement("div");
const ulElement = document.createElement("ul");
const liElement = document.createElement("li");
const h3Fase = document.createElement("h3");
const nFase = document.createElement("h3");
const start = document.createElement("button");
const titleElement = document.createElement("h2");
const campoDiv = document.querySelector(".campo");
const gameDiv = document.querySelector(".game");

function criarMenu() {
    gameDiv.style.display = "none";
    btnMenu.disabled = true;
    btnMenu.classList.add("transparent-button");

    popupDiv.className = "popup";

    h3Fase.className = "fase";
    h3Fase.textContent = "fase";
    nFase.className = "fase";
    nFase.textContent = fase;

    start.id = "start";
    start.className = "btnMenu";
    start.href = "#";
    start.textContent = "Iniciar";

    titleElement.className = "title";
    titleElement.textContent = "Menu";

    popupDiv.appendChild(titleElement);

    liElement.appendChild(h3Fase);
    liElement.appendChild(nFase);
    ulElement.appendChild(liElement);
    popupDiv.appendChild(ulElement);

    popupDiv.appendChild(start);

    campoDiv.appendChild(popupDiv);
}

function selectItem(dFlex) {
    const itemElements = document.querySelectorAll(".item");

    if (dFlex === "flex") {
        for (let item of itemElements) {
            item.style.display = "none";
        }
    } else {
        for (let item of itemElements) {
            item.style.display = "flex";
        }
    }
}

function abrirMenu() {
    popupDiv.style.display = "flex";
    btnMenu.disabled = true;
    btnMenu.classList.add("transparent-button");
    selectItem("flex");
}

function dinamic(base) {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200) {
        base += 80;
    } else if (windowWidth >= 900) {
        base += 60;
    } else if (windowWidth >= 600) {
        base += 40;

    } else if (windowWidth >= 300) {
        base += 20;

    } else {
        return base;
    }

    return base;
}

function mudarFonte(box) {
    const base = 40;
    let mudarFont;

    switch (qttCard) {
        case 4:
            mudarFont = dinamic(base);
            break;
        case 5:
            mudarFont = dinamic(base - 12);
            break;
        case 6:
            mudarFont = dinamic(base - 50);
            break;
        case 7:
            mudarFont = dinamic(base - 36);
            break;
        case 8:
            mudarFont = dinamic(base - 40);
            break;
        case 9:
            mudarFont = dinamic(base - 48);
            break;
    }
    box.style.fontSize = mudarFont + "px";
}

document.addEventListener("DOMContentLoaded", function () {
    criarMenu();
    const iniciarLink = document.getElementById("start");
    iniciarLink.addEventListener("click", function (e) {
        e.preventDefault();
        if (start.textContent === "Iniciar") {
            popupDiv.style.display = "none";
            start.textContent = "Voltar";
            startGame();
        } else {
            popupDiv.style.display = "none";
            selectItem("none");
            btnMenu.disabled = false;
            btnMenu.classList.remove("transparent-button");
        }
    });

    const menu = document.getElementById("menu");
    menu.addEventListener("click", function (e) {
        e.preventDefault();

        abrirMenu();
    });
});

function startGame() {
    btnMenu.disabled = false;
    btnMenu.classList.remove("transparent-button");

    gameDiv.style.display = "grid";
    const numColumns = qttCard;
    const numRows = qttCard;
    const gameContainer = document.querySelector(".game");

    gameContainer.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
    gameContainer.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

    let openCards = [];
    let gameCards = [];

    for (i = 0; i <= (qttCard ** 2) - 1; i++) {
        gameCards[i] = emojis[i];
    }
    let shuffleEmojis = gameCards.sort(() => (Math.random() > 0.5 ? 2 : -1));

    for (let i = 0; i < gameCards.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuffleEmojis[i];
        mudarFonte(box);
        box.onclick = handleClick;
        document.querySelector(".game").appendChild(box);
    }

    function handleClick() {
        if (openCards.length < 2) {
            this.classList.add("boxOpen");
            openCards.push(this);
        }

        if (openCards.length == 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            openCards[0].classList.add("boxMatch");
            openCards[1].classList.add("boxMatch");
        } else {
            openCards[1].classList.remove("boxOpen");
            openCards[0].classList.remove("boxOpen");
        }
        openCards = [];
        
        let boxMatch = document.querySelectorAll(".boxMatch");

        console.log(`boxMatch ${boxMatch.length} gameCards.length ${gameCards.length}`);

        if ( boxMatch.length=== gameCards.length) {

            qttCard += 2;
            start.textContent = "Iniciar";
            fase+=1;

            popupDiv.style.display = "flex";
            btnMenu.disabled = true;
            btnMenu.classList.add("transparent-button");

            selectItem("flex");
            criarMenu();
        }
    }
}

