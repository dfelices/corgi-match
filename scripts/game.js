// Array of Corgi images
const corgiArray = [ 
    { name: 'corgi1', img: 'images/corgi-1.svg', alt: 'a winking corgi'}, 
    { name: 'corgi2', img: 'images/corgi-2.svg', alt: 'a happy corgi' }, 
    { name: 'corgi3', img: 'images/corgi-3.svg', alt: 'a corgi on its hind legs' }, 
    { name: 'corgi4', img: 'images/corgi-4.svg', alt: 'a corgi laying down with its tail up and wagging' }, 
    { name: 'corgi5', img: 'images/corgi-5.svg', alt: 'a corgi waving one paw' }, 
    { name: 'corgi6', img: 'images/corgi-6.svg', alt: 'a corgi in rainboots' }, 
    { name: 'corgi1', img: 'images/corgi-1.svg', alt: 'a winking corgi'}, 
    { name: 'corgi2', img: 'images/corgi-2.svg', alt: 'a happy corgi' }, 
    { name: 'corgi3', img: 'images/corgi-3.svg', alt: 'a corgi on its hind legs' }, 
    { name: 'corgi4', img: 'images/corgi-4.svg', alt: 'a corgi laying down with its tail up and wagging' }, 
    { name: 'corgi5', img: 'images/corgi-5.svg', alt: 'a corgi waving one paw' }, 
    { name: 'corgi6', img: 'images/corgi-6.svg', alt: 'a corgi in rainboots' }, 
]; 

// Game Elements
const startBtn = document.getElementById('startBtn')
const startContainer = document.querySelector('.start')
const counters = document.querySelector('.counters')
const turnCounter = document.querySelector('.turn-counter')
const matchCounter = document.querySelector('.match-counter')
const gameBoard = document.querySelector('.game-board');


// Setting gameboard to be inactive unless start button is pressed
let gameActive = false

// Start button event listener, which when pressed calls the startGame function
startBtn.addEventListener('click', startGame)

// Starting game...
function startGame(){
    gameActive = true 

    // Displaying counters (one that counts the number of turns, the other that counts the number of matches)
    counters.style.display = 'flex'
    counters.style.flexDirection = 'row'
    counters.style.justifyContent = 'center'
    counters.style.columnGap = '2rem'
    counters.style.height = '2.5rem'

    // Resetting the counters to zero
    turnCounter.innerHTML = '0'
    matchCounter.innerHTML = '0'

    // Hiding start button
    startBtn.style.display = 'none'
    startContainer.style.display = 'none'

    // Shuffle cards using the Fisher-Yates (Knuth) Shuffle algorithm
    function shuffle(array) { 
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
    }

    // Create a copy of the corgi array using the spread operator, then shuffling that copied array
    const shuffledCards = shuffle([...corgiArray]);

    // Clear the game board, ready for new game
    gameBoard.innerHTML = '';
    
    // For each card, create a new "card" div to show side "B" of the corgi card, then append it to the empty side-b div

    // Add event listener to listen for user "click"
    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="card-flipper">
                <div class="side-a">
                    <img src="images/corgi-back.svg" alt="Corgi back">
                </div>
                <div class="side-b">
                    <img src="${card.img}" alt="${card.name}">
                </div>
            </div>
        `;

        // add a click event to each card that when clicked, enables the "flip card" function
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    
    
    // Assigning default state to cards, showing the backside of card
    let hasFlippedCard = false;
    
    // Declaring 2 variables for the first card chosen and then the second card chosen (to be assigned, once the user clicks on that card)
    let firstCard;
    let secondCard;
    
    
    // Adding the class of "flipped" to the selected cards
    function flipCard() {

        // fast fail, if the game has not been activated (by pressing the start button), don't flip card
        if (!gameActive) return;

        // if the user clicks on the exact same card again (the one that was initially assigned as the "first card") then the function exits early
        if (this === firstCard) return;
    
        // add the "flipped" class to the chosen card
        this.classList.add('flipped');
        
        // if the chosen card "this" has not been flipped (false), reassigned it's value to "true", since it has now been flipped, then assign this card with the first card variable
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;

        // if the chosen card has not been flipped (false), then assign this card with the second card variable
        } else {
            hasFlippedCard = false;
            secondCard = this;

            // once the second card is chosen, enable check for match function
            checkForMatch();

            // enables add turn function
            addTurn()
        }
    }
    
    // Add a turn every time two cards are selected, regardless if they match or not
    function addTurn(){
        const turnCounter = document.querySelector('.turn-counter')
        let turnNum = Number(turnCounter.innerHTML)
        turnNum++
        turnCounter.innerHTML = turnNum
    }
    
    function checkForMatch() {
        // This compares if the src attribute (aka the image) of the first card, is the same as the second card
        if (firstCard.querySelector('.side-b img').src === secondCard.querySelector('.side-b img').src) {
            disableCards();
            addScore();
        } else {
            unflipCards();
        }
    }
    
    // If the cards match, make them unclickable, and also disables them from being flipped back
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }
    
    // Add to match score
    function addScore(){
        // changes the match number string into a number
        let matchNum = Number(matchCounter.innerHTML)
    
        matchNum++
        matchCounter.innerHTML = matchNum
    
        // if the number of matches reaches 6 (the number of card pair there are) , then the game becomes inactive and the start button reappears but this time with the text "play again", if it's clicked, it resets the game
        if (matchNum === 6) {
            gameActive = false
            startBtn.style.display = 'block'
            startContainer.style.display = 'block'
            startBtn.innerHTML = 'Play again?'
            counters.style.display = 'none'
        }
    }
        
    // If the cards don't match, flip them back, but not right away. Give them some time 1200 milliseconds before the cards flip back
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1200);
    }
}











