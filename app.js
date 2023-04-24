var deckId;

var playerHand;

var dealerHand;

function newDeck(){
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
        .then(response => response.json()) 
        .then(data => {   
            deckId = data.deck_id;

            let pdeck = document.getElementById('pDeckId');

            pdeck.innerHTML = `Deckid = ${deckId}`;
                        
        })
}

function newHand(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json()) 
        .then(data => {

            let reset = document.getElementById('playerHand');
            reset.innerHTML = "";

            for (let i in data.cards) {
                let ul = document.getElementById('playerHand');

                let li = document.createElement('li');

                li.classList.add('list-group-item')

                li.innerHTML = (`
                    <img src="${data.cards[i].images.png }" alt="card">
                `);
                ul.appendChild(li);   
            }         
    })
}

function addCard(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json()) 
        .then(data => {
            for (let i in data.cards) {
                let ul = document.getElementById('playerHand');

                let li = document.createElement('li');

                li.classList.add('list-group-item')

                li.innerHTML = (`
                    <img src="${data.cards[i].images.png }" alt="card">
                `);
                ul.appendChild(li);   
            }         
    })
}

//data.cards[0].value 
//data.cards[0].suit
//data.cards[0].images.png 
//https://deckofcardsapi.com/api/deck/new/draw/?count=2