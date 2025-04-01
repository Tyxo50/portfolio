const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];
const numDots = 100;

for (let i = 0; i < numDots; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 1.2,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6
  });
}

function drawLine(x1, y1, x2, y2, alpha) {
  ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function animateNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach(dot => {
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fill();
    dot.x += dot.dx;
    dot.y += dot.dy;
    if (dot.x <= 0 || dot.x >= canvas.width) dot.dx *= -1;
    if (dot.y <= 0 || dot.y >= canvas.height) dot.dy *= -1;
  });

  for (let i = 0; i < numDots; i++) {
    for (let j = i + 1; j < numDots; j++) {
      const a = dots[i], b = dots[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 100) drawLine(a.x, a.y, b.x, b.y, 1 - dist / 100);
    }
  }

  requestAnimationFrame(animateNetwork);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animateNetwork();

const titleText = "Tom Lelievre";
const typedTitleEl = document.getElementById("typed-title");
const cursor = document.querySelector(".cursor");
let i = 0;

function typeTitle() {
  if (i < titleText.length) {
    typedTitleEl.textContent += titleText.charAt(i);
    i++;
    setTimeout(typeTitle, 175);
  } else {
    cursor.style.display = "inline-block";
  }
}

const terminalContent = document.querySelector('.terminal-content');
let grid = Array(9).fill(" ");

function drawGrid(grid) {
  return `\n ${grid[0]} | ${grid[1]} | ${grid[2]}\n-----------\n ${grid[3]} | ${grid[4]} | ${grid[5]}\n-----------\n ${grid[6]} | ${grid[7]} | ${grid[8]}\n`;
}

function checkWin(grid, player) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => combo.every(i => grid[i] === player));
}

function getAvailableMoves(grid) {
  return grid.map((val, i) => val === " " ? i : null).filter(i => i !== null);
}

function updateTerminal() {
  document.querySelectorAll('.terminal-line.grid').forEach(line => line.remove());
  const newLine = document.createElement('pre');
  newLine.classList.add('terminal-line', 'grid');
  newLine.textContent = drawGrid(grid);
  terminalContent.appendChild(newLine);
}

function showMessage(text, color) {
  const msg = document.createElement('div');
  msg.classList.add('terminal-line');
  msg.innerHTML = `<span class="${color}">${text}</span>`;
  terminalContent.appendChild(msg);
}

function restartGame() {
  grid = Array(9).fill(" ");
  document.querySelectorAll('.terminal-line').forEach(line => {
    if (!line.classList.contains('initial-launch')) line.remove();
  });
  startMorpionTyping();
}

function displayInputPrompt() {
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('terminal-line', 'input-wrapper');
  inputWrapper.innerHTML = '<span class="green">T0m_Lel13vr3@portfolio</span>:<span class="blue">~</span>$ Choose a number (0-8) to play: <input type="text" id="moveInput" maxlength="1" style="background:none;border:none;color:#33ff33;width:20px;outline:none;">';
  terminalContent.appendChild(inputWrapper);
  const input = document.getElementById('moveInput');
  input.focus();

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const move = parseInt(input.value);
      const errorLine = document.querySelector('.terminal-line.error');
      if (errorLine) errorLine.remove();

      if (!isNaN(move) && move >= 0 && move <= 8 && grid[move] === " ") {
        grid[move] = "X";
        inputWrapper.remove();
        updateTerminal();

        if (checkWin(grid, "X")) {
          showMessage("You win", "green");
          return setTimeout(restartGame, 1800);
        }

        setTimeout(() => {
          const aiMoves = getAvailableMoves(grid);
          if (aiMoves.length > 0) {
            const rand = aiMoves[Math.floor(Math.random() * aiMoves.length)];
            grid[rand] = "O";

            if (checkWin(grid, "O")) {
              updateTerminal();
              showMessage("You loose", "red");
              return setTimeout(restartGame, 1800);
            }
          }

          if (getAvailableMoves(grid).length === 0) {
            updateTerminal();
            showMessage("Draw !", "blue");
            return setTimeout(restartGame, 1800);
          }

          updateTerminal();
          displayInputPrompt();
        }, 500);

      } else {
        const err = document.createElement('div');
        err.classList.add('terminal-line', 'error');
        err.innerHTML = '<span class="red">Invalid input</span>';
        terminalContent.appendChild(err);
        input.value = "";
      }
    }
  });
}

function startMorpionTyping() {
  const promptLine = document.createElement('p');
  promptLine.classList.add('terminal-line', 'python-launch');
  promptLine.innerHTML = '<span class="green">T0m_Lel13vr3@portfolio</span>:<span class="blue">~</span>$';
  const typedCmdSpan = document.createElement('span');
  promptLine.appendChild(typedCmdSpan);
  terminalContent.appendChild(promptLine);

  const cmd = 'python3 morpion';
  let j = 0;

  function typeChar() {
    typedCmdSpan.textContent = cmd.slice(0, j);
    j++;
    if (j <= cmd.length) {
      setTimeout(typeChar, 60);
    } else {
      setTimeout(() => {
        updateTerminal();
        displayInputPrompt();
      }, 500);
    }
  }
  typeChar();
}

window.onload = () => {
  setTimeout(() => canvas.classList.add("visible"), 300);
  setTimeout(() => {
    document.querySelector(".bottom-nav").classList.add("show");
    document.querySelector(".socials").classList.add("show");
    document.getElementById("typed-line").classList.add("show");
    document.getElementById("subtitle-title").classList.add("show");
    document.getElementById("subtitle-text").classList.add("show");
    document.getElementById("btn-more").classList.add("show");
    document.getElementById("terminal-box-game").classList.add("show");
  }, 1000);
  setTimeout(typeTitle, 2000);

  const initial = document.createElement('p');
  initial.classList.add('terminal-line', 'initial-launch');
  terminalContent.appendChild(initial);

  setTimeout(startMorpionTyping, 3500);

  fetch("https://email-backend-w336.onrender.com")
    .then(() => console.log("[Ping] Backend réveillé au chargement"))
    .catch(() => console.warn("[Ping] Échec du ping au chargement"));
};

const footer = document.querySelector("footer");
const bottomNav = document.querySelector(".bottom-nav");

if (footer && bottomNav) {
  const navObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bottomNav.classList.add("fade-out");
    } else {
      bottomNav.classList.remove("fade-out");
    }
  }, { threshold: 0.2 });

  navObserver.observe(footer);
}