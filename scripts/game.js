// Array of Corgi images
const corgiArray = [ 
    { name: 'corgi1', img: 'images/corgi-1.svg' }, 
    { name: 'corgi2', img: 'images/corgi-2.svg' }, 
    { name: 'corgi3', img: 'images/corgi-3.svg' }, 
    { name: 'corgi4', img: 'images/corgi-4.svg' }, 
    { name: 'corgi5', img: 'images/corgi-5.svg' }, 
    { name: 'corgi6', img: 'images/corgi-6.svg' }, 
    { name: 'corgi1', img: 'images/corgi-1.svg' }, 
    { name: 'corgi2', img: 'images/corgi-2.svg' }, 
    { name: 'corgi3', img: 'images/corgi-3.svg' }, 
    { name: 'corgi4', img: 'images/corgi-4.svg' }, 
    { name: 'corgi5', img: 'images/corgi-5.svg' }, 
    { name: 'corgi6', img: 'images/corgi-6.svg' }, 
]; 

// Starting game
let gameActive = false

const startBtn = document.getElementById('startBtn')
const startContainer = document.querySelector('.start')
const counters = document.querySelector('.counters')
const turnCounter = document.querySelector('.turn-counter')
const matchCounter = document.querySelector('.match-counter')

startBtn.addEventListener('click', startGame)

function startGame(){
    gameActive = true
    counters.style.display = 'flex'
    counters.style.flexDirection = 'row'
    counters.style.justifyContent = 'center'
    counters.style.columnGap = '2rem'
    counters.style.height = '2.5rem'
    turnCounter.innerHTML = '0'
    matchCounter.innerHTML = '0'
    startBtn.style.display = 'none'
    startContainer.style.display = 'none'

    // Shuffle cards
    function shuffle(array) { 
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
    }

    // Create new array of shuffled cards / new array of corgi images
    const shuffledCards = shuffle([...corgiArray]);

    // Clear the game board, ready for new game
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    
    // Create a new card to show side "B" of the corgi card, then append it to the empty side-b div
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
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    
    
    // Assigning default state to cards, showing the backside of card
    let hasFlippedCard = false;
    
    // Assigning a variable to the first clicked card, then the second clicked card
    let firstCard, secondCard;
    
    
    // Adding the class of "flipped" to the selected cards
    function flipCard() {
        if (!gameActive) return;
        if (this === firstCard) return;
    
        this.classList.add('flipped');
        
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            hasFlippedCard = false;
            secondCard = this;
            checkForMatch();
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
        if (firstCard.querySelector('.side-b img').alt === secondCard.querySelector('.side-b img').alt) {
            disableCards();
            addScore();
        } else {
            unflipCards();
        }
    }
    
    // If the cards match, making them unclickable
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }
    
    // Add to match score
    function addScore(){
        const matchCounter = document.querySelector('.match-counter')
        let matchNum = Number(matchCounter.innerHTML)
    
        matchNum++
        matchCounter.innerHTML = matchNum
    
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











