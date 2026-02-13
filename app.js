const newGameBtn = document.getElementById('new-game-btn');
const drawBtn = document.getElementById('draw-btn');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const remainingEl = document.getElementById('remaining');
const playerCardSlot = document.getElementById('player-card');
const computerCardSlot = document.getElementById('computer-card');
const statusEl = document.getElementById('status');

let deckId;
let playerScore = 0;
let computerScore = 0;

const handleNewGameClick = async () => {
  statusEl.textContent = 'Shuffling deck...';
  const response = await fetch(
    'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/',
  );
  if (!response.ok) {
    throw new Error('Request failed.');
  }

  const data = await response.json();
  console.log(data)
  deckId = data.deck_id;
  remainingEl.textContent = data.remaining;

  drawBtn.disabled = false;
  statusEl.textContent = 'Deck ready. Draw a card!';
};

newGameBtn.addEventListener('click', handleNewGameClick);
