const statusEl = document.getElementById('status');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const remainingEl = document.getElementById('remaining');
const playerCardSlot = document.getElementById('player-card');
const computerCardSlot = document.getElementById('computer-card');
const newGameBtn = document.getElementById('new-game-btn');
const drawBtn = document.getElementById('draw-btn');

let deckId = '';
let playerScore = 0;
let computerScore = 0;

const getCardRank = (value) => {
  if (value === 'ACE') return 14;
  if (value === 'KING') return 13;
  if (value === 'QUEEN') return 12;
  if (value === 'JACK') return 11;
  return Number(value);
};

const handleNewGameClick = async () => {
  statusEl.textContent = 'Shuffling deck...';

  const response = await fetch(
    'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }

  const data = await response.json();

  deckId = data.deck_id;
  remainingEl.textContent = data.remaining;

  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  playerCardSlot.innerHTML = '';
  computerCardSlot.innerHTML = '';

  drawBtn.disabled = false;
  statusEl.textContent = 'Deck ready. Click Draw!';

  console.log(data);
};

const handleDrawClick = async () => {
  drawBtn.disabled = true;

  const response = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`,
  );

  if (!response.ok) {
    throw new Error('Draw request failed.');
  }

  const data = await response.json();

  playerCardSlot.innerHTML = `
    <img src='${data.cards[0].image}' alt='Player card' />
  `;

  computerCardSlot.innerHTML = `
    <img src='${data.cards[1].image}' alt='computer card' />
  `;

  const playerCard = data.cards[0];
  const computerCard = data.cards[1];

  const playerRank = getCardRank(playerCard.value);
  const computerRank = getCardRank(computerCard.value);

  if (playerRank > computerRank) {
    playerScore++;
    statusEl.textContent = 'Player wins this round!';
  } else if (computerRank > playerRank) {
    computerScore++;
    statusEl.textContent = 'Computer wins this round!';
  } else {
    statusEl.textContent = "War! It's a tie.";
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  remainingEl.textContent = data.remaining;

  if (data.remaining === 0) {
    drawBtn.disabled = true;

    if (playerScore > computerScore) {
      statusEl.textContent = 'Game over! Player wins!';
    } else if (computerScore > playerScore) {
      statusEl.textContent = 'Game over! Computer wins!';
    } else {
      statusEl.textContent = "Game over! It's a tie!";
    }
    return;
  }

  if (data.remaining > 0) {
    drawBtn.disabled = false;
  }
};

newGameBtn.addEventListener('click', handleNewGameClick);
drawBtn.addEventListener('click', handleDrawClick);
