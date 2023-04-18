var deckId;
const deckForm = document.getElementById('deckForm');

// Listen for submissions on GitHub username input form
deckForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    requestIdDeck()
        .then(response => response.json()) // parse response into json
        .then(data => {   
            deckId = data.deck_id;
            alert(deckId);            
        })
})

function requestIdDeck() {
    return Promise.resolve(fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`));
}
