// Animación máquina de escribir en loop
const animatedCode = document.getElementById('animated-code');
const codeText = "console.log('Preparando algo grande...');";

let index = 0;
let forward = true;

function typeWriterLoop() {
  if (forward) {
    if (index < codeText.length) {
      animatedCode.textContent += codeText.charAt(index);
      index++;
      setTimeout(typeWriterLoop, 100);
    } else {
      forward = false;
      setTimeout(typeWriterLoop, 1500);
    }
  } else {
    if (index > 0) {
      animatedCode.textContent = codeText.substring(0, index - 1);
      index--;
      setTimeout(typeWriterLoop, 50);
    } else {
      forward = true;
      setTimeout(typeWriterLoop, 500);
    }
  }
}

typeWriterLoop();

// Bichos caminando y muriendo al hacer click
const bugContainer = document.getElementById('bug-container');
const BUGS_COUNT = 20;
const BUGS_EMOJIS = ['🕷️'];

let bugsKilled = 0;
let speedMultiplier = 1; // Multiplicador de velocidad inicial

// Crear contenedor para kill count y timer
const statsContainer = document.createElement('div');
statsContainer.id = 'bug-stats-container';

const killCountDisplay = document.createElement('div');
killCountDisplay.id = 'bug-kill-count';
killCountDisplay.textContent = 'Bugs Killed: 0';

const timerDisplay = document.createElement('div');
timerDisplay.id = 'bug-timer';
timerDisplay.textContent = 'Time: 00:00';

statsContainer.appendChild(killCountDisplay);
statsContainer.appendChild(timerDisplay);
document.body.appendChild(statsContainer);

const bugs = [];
const BUG_SIZE = 30;

for (let i = 0; i < BUGS_COUNT; i++) {
  const bug = document.createElement('div');
  bug.classList.add('bug');
  bug.textContent = BUGS_EMOJIS[Math.floor(Math.random() * BUGS_EMOJIS.length)];

  bug.style.top = `${Math.random() * (window.innerHeight - BUG_SIZE)}px`;
  bug.style.left = `${Math.random() * (window.innerWidth - BUG_SIZE)}px`;

  bugContainer.appendChild(bug);

  bugs.push({
    el: bug,
    x: parseFloat(bug.style.left),
    y: parseFloat(bug.style.top),
    dx: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1),
    dy: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1),
    alive: true,
  });

  function killBug(bugEl) {
    if (!bugEl.classList.contains('dead')) {
      bugEl.classList.add('dead');
      const b = bugs.find(bugObj => bugObj.el === bugEl);
      if (b) b.alive = false;

      createBloodSplatter(bugEl);

      bugsKilled++;
      killCountDisplay.textContent = `Bugs Killed: ${bugsKilled}`;

      speedMultiplier += 0.5; // Aumenta velocidad un 5% cada vez que matas un bicho
      

      setTimeout(() => {
        bugEl.remove();
      }, 600);
    }
  }

  bug.addEventListener('click', () => killBug(bug));
}

function moveBugs() {
  bugs.forEach(bug => {
    if (!bug.alive) return;

    bug.x += bug.dx * speedMultiplier;
    bug.y += bug.dy * speedMultiplier;

    if (bug.x < 0 || bug.x > window.innerWidth - BUG_SIZE) bug.dx *= -1;
    if (bug.y < 0 || bug.y > window.innerHeight - BUG_SIZE) bug.dy *= -1;

    bug.el.style.left = bug.x + 'px';
    bug.el.style.top = bug.y + 'px';
  });

  requestAnimationFrame(moveBugs);
}

function createBloodSplatter(bug) {
  const splatterCount = 12; // más partículas para efecto más visible
  const rect = bug.getBoundingClientRect();

  for (let i = 0; i < splatterCount; i++) {
    const splatter = document.createElement('div');
    splatter.className = 'blood-splatter';

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 60 + 15;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    splatter.style.left = `${rect.left + rect.width / 2}px`;
    splatter.style.top = `${rect.top + rect.height / 2}px`;

    splatter.style.setProperty('--x', `${x}px`);
    splatter.style.setProperty('--y', `${y}px`);

    document.body.appendChild(splatter);

    setTimeout(() => {
      splatter.remove();
    }, 700);
  }
}

moveBugs();

// Cronómetro: actualización cada segundo
let secondsElapsed = 0;
setInterval(() => {
  secondsElapsed++;
  const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
  const secs = (secondsElapsed % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `Time: ${mins}:${secs}`;
}, 1000);
