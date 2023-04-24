var deckId;
var playerHand = [];
var dealerHand = [];

window.onload = function() {
    newDeck();
};

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

            playerHand = [];

            let hitButton = document.querySelector('#hitButton');
            hitButton.disabled = false;

            for (let i in data.cards) {
                let ul = document.getElementById('playerHand');

                let li = document.createElement('li');

                li.classList.add('list-group-item')

                li.innerHTML = (`
                    <img src="${data.cards[i].images.png }" alt="card">
                `);
                ul.appendChild(li);  

                playerHand.push(data.cards[i].value);
            }
            
            countCards();
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
                
                playerHand.push(data.cards[i].value);
            }
            countCards();
    })

    
}

function countCards(){    
    let pCounter = document.getElementById('playerCounter');
    let sum = 0;

    for(let i in playerHand){
        switch(playerHand[i]){
            case `ACE`:
                sum +=1;
                break;
            case `QUEEN`:
                sum +=10;
                break;
            case `KING`:
                sum +=10;
                break;
            case `JACK`:
                sum +=10;
                break;
            default:
                sum += +playerHand[i];
        }
    }
    pCounter.innerHTML = `Counter = ${sum}`;

    if(sum>21){
        let hitButton = document.querySelector('#hitButton');
        hitButton.disabled = true;
    }
}

function stop(){
    let hitButton = document.querySelector('#hitButton');
    hitButton.disabled = true;

    dealerAI();
}

function dealerAI(){
    
}

//data.cards[0].value 
//data.cards[0].suit
//data.cards[0].images.png 
//https://deckofcardsapi.com/api/deck/new/draw/?count=2