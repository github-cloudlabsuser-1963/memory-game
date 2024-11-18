window.onload = function () {
    const gameBoard = document.getElementById('game-board');
    const winMessage = document.createElement('div');
    winMessage.id = 'win-message';
    winMessage.innerText = 'You Win!';
    document.body.appendChild(winMessage);
    const cards = [];
    let flippedCards = [];
    let matchedPairs = 0;

    fetch('https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json')
        .then(response => response.json())
        .then(symbols => {
            // Limit to 8 unique symbols for a 4x4 grid
            const selectedSymbols = symbols.slice(0, 8);
            selectedSymbols.forEach(symbol => {
                cards.push(createCard(symbol));
                cards.push(createCard(symbol));
            });

            shuffle(cards);
            cards.forEach(card => {
                gameBoard.appendChild(card);
            });
        });

    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol.name;

        const img = document.createElement('img');
        img.src = symbol.image;
        img.classList.add('card-image'); 
        card.appendChild(img);

        card.addEventListener('click', flipCard);

        return card;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === 8) {
                winMessage.style.display = 'block';
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
};
