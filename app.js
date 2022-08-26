const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) { // if 2 cards match
        matchedCard++; // increment value by 1
        // if matched value is 8, means user has matched all cards
        if(matchedCard == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000); // calling shuffleCard function after 1 second
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; // setting card values to blank
        return disableDeck = false;
    }
    // if the cards dont match
    setTimeout(() => {
        // adding the shakey shakey after the 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        // removing both shake & flip classes from both cards after 1.2 seconds
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; // setting card values to blank
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matchedCard = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    // creating an array of 16 items and each item is repeated x2
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // sorting items randomly

    // removing flip class from all cards and passing random image to each card
    cards.forEach((card, index) => { 
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `Images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => { // adding click event to all cards
    card.addEventListener("click", flipCard);
});