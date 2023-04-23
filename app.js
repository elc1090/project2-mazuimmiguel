var deckId;

function newDeck(){
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
        .then(response => response.json()) // parse response into json
        .then(data => {   
            deckId = data.deck_id;
            alert(deckId);            
        })
}

const handForm = document.getElementById('handForm');

function newHand(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json()) // parse response into json
        .then(data => {   
        alert(data.cards[0].value +" "+ data.cards[0].suit);
        alert(data.cards[1].value);           
    })
}