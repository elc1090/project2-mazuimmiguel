var deckId;
var playerHand = [];
var dealerHand = [];
var dealerSum;
var playerSum;

var stats = [0,0,0,0]

window.onload = function() {
    newDeck();
};

async function newDeck(){
    await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
        .then(response => response.json()) 
        .then(data => {   
            deckId = data.deck_id;
                                
        })
    stats[0]++;
    newGame();
}

function newGame (){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
        .then(response => response.json()) 
        .then(data => {

            let resetPlayer = document.getElementById('playerHand');
            resetPlayer.innerHTML = "";

            let resetdealer = document.getElementById('dealerHand');
            resetdealer.innerHTML = "";

            playerHand = [];

            dealerHand = [];

            let hitButton = document.querySelector('#hitButton');
            hitButton.disabled = false;

            let stopButton = document.querySelector('#stopButton');
            stopButton.disabled = false;

            for (let i = 0; i < 2; i++) {
                let ul = document.getElementById('playerHand');

                let li = document.createElement('li');

                li.classList.add('list-group-item')

                li.innerHTML = (`
                    <img src="${data.cards[i].images.png }" alt="card">
                `);
                ul.appendChild(li);  

                playerHand.push(data.cards[i].value);
            }

            for (let i = 2; i < 4; i++) {
                let ul = document.getElementById('dealerHand');

                let li = document.createElement('li');

                li.classList.add('list-group-item')

                li.innerHTML = (`
                    <img src="${data.cards[i].images.png }" alt="card">
                `);
                ul.appendChild(li);  

                dealerHand.push(data.cards[i].value);
            }

            countCards('playerHand');
            countCards('dealerHand');
        }) 
    stats[1]++;
}           
            
async function addCard(handType){
    await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json()) 
        .then(data => {
            if(handType === 'playerHand'){
                let ul = document.getElementById('playerHand');
                let li = document.createElement('li');
    
                li.classList.add('list-group-item')
    
                li.innerHTML = (`
                    <img src="${data.cards[0].images.png }" alt="card">
                `);
                ul.appendChild(li);
                    
                playerHand.push(data.cards[0].value);
                countCards('playerHand');
            }else{
                let ul = document.getElementById('dealerHand');
                let li = document.createElement('li');
    
                li.classList.add('list-group-item')
    
                li.innerHTML = (`
                    <img src="${data.cards[0].images.png }" alt="card">
                `);
                ul.appendChild(li);
                    
                dealerHand.push(data.cards[0].value);
                countCards('dealerHand');
            }  
    })
}

function countCards(handType){    
    let sum = 0;

    if(handType === 'playerHand'){
        let pCounter = document.getElementById('playerCounter');
        for(let i in playerHand){

            switch(playerHand[i]){
                case `ACE`:
                    if(playerHand.length === 2 && (playerHand[0]) != playerHand[1]){//Soft
                        sum +=11; 
                    }else{
                        sum +=1;
                    }
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
        pCounter.innerHTML = `Card Counter = ${sum}`;
        playerSum = sum;
    
        if(sum>21){
            let hitButton = document.querySelector('#hitButton');
            hitButton.disabled = true;

            let stopButton = document.querySelector('#stopButton');
            stopButton.disabled = true;

            resultMatch('bust');
        }

    }else{
        let pCounter = document.getElementById('dealerCounter');
        for(let i in dealerHand){
            switch(dealerHand[i]){
                case `ACE`:
                    if(dealerHand.length === 2){
                        sum +=11; 
                    }else{
                        sum +=1;
                    }
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
                    sum += +dealerHand[i];
            }
        }
        pCounter.innerHTML = `Card Counter = ${sum}`;
        dealerSum = sum;
    } 
}

function stop(){
    let hitButton = document.querySelector('#hitButton');
    hitButton.disabled = true;

    let stopButton = document.querySelector('#stopButton');
    stopButton.disabled = true;
    dealerAI();
}

async function dealerAI(){
    while(dealerSum <17){
        await Promise.resolve(addCard('dealerHand')); 
    }
    resultMatch();
}

function resultMatch(result){
    if(dealerSum > 21){
        swal("Você ganhou!", "Causa: Dealer passou de 21!", "success");
        stats[2]++;
    }else if(result === "bust"){
        swal("Você perdeu!", "Causa: Passou de 21!", "error");
        stats[3]++;
    }else if(dealerSum >= playerSum){
        swal("Você perdeu!", "Causa: Tem menos ou igual que o dealer!", "error");
        stats[3]++;
    }else{
        swal("Você ganhou!", "Causa: Tem mais que o dealer!", "success");
        stats[2]++;
    }
}

function statsCall(){
    swal("Estatísticas:", `Nesta sessão:
                           Novo decks:${stats[0]}, 
                           Novo jogos:${stats[1]}, 
                           Jogos ganhos:${stats[2]}, 
                           Jogos perdidos:${stats[3]}.`);
}