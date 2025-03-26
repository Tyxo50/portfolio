
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];

for (let i = 0; i < 100; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animateDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff00';
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fill();

    dot.x += dot.dx;
    dot.y += dot.dy;

    if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
    if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
  });
  requestAnimationFrame(animateDots);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animateDots();

// Typing effect
const titleText = "Tom Lelievre";
const typedTitleEl = document.getElementById("typed-title");
const cursor = document.querySelector(".cursor");
let i = 0;

function typeTitle() {
  if (i < titleText.length) {
    typedTitleEl.textContent += titleText.charAt(i);
    i++;
    setTimeout(typeTitle, 100);
  } else {
    cursor.style.display = "inline-block";
  }
}

// On load: animate canvas + show nav + socials
window.onload = () => {
  // Fade in background canvas
  setTimeout(() => {
    canvas.classList.add("visible");
  }, 300);

 

  // Start typing
  setTimeout(typeTitle, 2000);
};