class Card {
    constructor(suit, rank, score) {
        this.suit = this.suitOptions(suit)
        this.rank = this.rankOptions(rank)
        this.score = this.scoreOptions(score)
    }

    suitOptions(suit) {
        if (suit === "hearts" || "spades" || "clubs" || "diamonds") {
            return suit
        }
    }

    rankOptions(rank) {
        if (rank >= 2 && rank <= 10 || rank === "ace" || rank === "jack" || rank === "king" || rank === "queen") {
            return rank
        }
    }

    scoreOptions(score) {
        if (score >= 1 && score <= 13) {
            return score
        }
    }
}

class Deck {
    constructor() {
        this.length = 52
        this.cards = this.createDeck()
    }

    createDeck() {

        let cards = []

        let suitArray = ["hearts", "spades", "clubs", "diamonds"]
        let rankArray = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"]

        for (let i = 0; i < suitArray.length; i++) {
            for (let j = 0; j < rankArray.length; j + 1) {
                let freshCard = new Card(suitArray[i], rankArray[j], j += 1)
                cards.push(freshCard)
            }
        }

        function shuffle(cards) {
            let currentIndex = cards.length,  randomIndex;

            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
            }
        }
        
        shuffle(cards);

        return cards;
    }
}

const freshDeck = new Deck()

console.log(freshDeck)
