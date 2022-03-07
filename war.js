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
      let currentIndex = cards.length, randomIndex;

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

let playerOne = []
let playerTwo = []

function splitDeck() {
  for (let i = 0; i < 26; i++) {
    playerOne.push(freshDeck.cards[i])
  }
  for (let i = 26; i < 52; i++) {
    playerTwo.push(freshDeck.cards[i])
  }
}

splitDeck();

function playGame() {

  while ((playerOne.length < 52) && (playerTwo.length < 52)) {

    function playRound() {

      if (playerOne[0].score > playerTwo[0].score) {
        console.log("Player One plays " + playerOne[0].rank + " of " + playerOne[0].suit + " and Player Two plays " + playerTwo[0].rank + " of " + playerTwo[0].suit + ". Player One Wins!")
        playerOne.push(playerOne[0])
        playerOne.shift()
        playerOne.push(playerTwo[0])
        playerTwo.shift()
        console.log("Player One has " + playerOne.length + " cards and Player Two has " + playerTwo.length + " cards.")
        return
      }

      if (playerOne[0].score < playerTwo[0].score) {
        console.log("Player One plays " + playerOne[0].rank + " of " + playerOne[0].suit + " and Player Two plays " + playerTwo[0].rank + " of " + playerTwo[0].suit + ". Player Two Wins!")
        playerTwo.push(playerOne[0])
        playerOne.shift()
        playerTwo.push(playerTwo[0])
        playerTwo.shift()
        console.log("Player One has " + playerOne.length + " cards and Player Two has " + playerTwo.length + " cards.")
        return
      }

      if (playerOne[0].score === playerTwo[0].score) {

        let faceDown = []

        function mix(faceDown) {
          let currentIndex = faceDown.length, randomIndex;

          while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [faceDown[currentIndex], faceDown[randomIndex]] = [faceDown[randomIndex], faceDown[currentIndex]];
          }
        }

        while (playerOne[0].score === playerTwo[0].score) {

          console.log("Player One plays " + playerOne[0].rank + " of " + playerOne[0].suit + " and Player Two plays " + playerTwo[0].rank + " of " + playerTwo[0].suit + ". It's a tie! Let the war begin...")

          function tie() {

            if (playerOne.length > 4 && playerTwo.length > 4) {
              faceDown.push(playerOne[0], playerOne[1], playerOne[2], playerOne[3], playerTwo[0], playerTwo[1], playerTwo[2], playerTwo[3])
              mix(faceDown)
              playerOne.splice(0, 4)
              playerTwo.splice(0, 4)
              return
            }

            if (playerOne.length === 4 || playerTwo.length === 4) {
              faceDown.push(playerOne[0], playerOne[1], playerOne[2], playerTwo[0], playerTwo[1], playerTwo[2])
              mix(faceDown)
              playerOne.splice(0, 3)
              playerTwo.splice(0, 3)
              return
            }

            if (playerOne.length === 3 || playerTwo.length === 3) {
              faceDown.push(playerOne[0], playerOne[1], playerTwo[0], playerTwo[1])
              mix(faceDown)
              playerOne.splice(0, 2)
              playerTwo.splice(0, 2)
              return
            }

            if (playerOne.length === 2 || playerTwo.length === 2) {
              faceDown.push(playerOne[0], playerTwo[0])
              mix(faceDown)
              playerOne.splice(0, 1)
              playerTwo.splice(0, 1)
              return
            }

            if (playerOne.length === 1) {
              faceDown.push(playerTwo[0])
              playerTwo.shift()
              return
            }

            if (playerTwo.length === 1) {
              faceDown.push(playerOne[0])
              playerOne.shift()
              return
            }

          }

          tie();

        }

        if (playerOne[0].score > playerTwo[0].score) {
          console.log("Player One plays " + playerOne[0].rank + " of " + playerOne[0].suit + " and Player Two plays " + playerTwo[0].rank + " of " + playerTwo[0].suit + ". Player One Wins!")
          faceDown.push(playerOne[0])
          playerOne.shift()
          faceDown.push(playerTwo[0])
          playerTwo.shift()
          mix(faceDown)
          while (faceDown.length > 0) {
            playerOne.push(faceDown[0])
            faceDown.shift()
          }
          console.log("Player One has " + playerOne.length + " cards and Player Two has " + playerTwo.length + " cards.")
          return
        }

        if (playerOne[0].score < playerTwo[0].score) {
          console.log("Player One plays " + playerOne[0].rank + " of " + playerOne[0].suit + " and Player Two plays " + playerTwo[0].rank + " of " + playerTwo[0].suit + ". Player Two Wins!")
          faceDown.push(playerOne[0])
          playerOne.shift()
          faceDown.push(playerTwo[0])
          playerTwo.shift()
          mix(faceDown)
          while (faceDown.length > 0) {
            playerTwo.push(faceDown[0])
            faceDown.shift()
          }
          console.log("Player One has " + playerOne.length + " cards and Player Two has " + playerTwo.length + " cards.")
          return
        }
      }

    }

    playRound();
  }

  if (playerOne.length === 52) {
    console.log("PLAYER ONE WINS THE WAR!")
  }

  if (playerTwo.length === 52) {
    console.log("PLAYER TWO WINS THE WAR!")
  }
}

playGame();


