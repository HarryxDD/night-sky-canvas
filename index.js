const MOON_COLOR = "#EAF2FF"
const STAR_COLOR = "rgb(255, 255, 255)"
const GRADIENT_BG = [
  {value: 0, color: "#C8D9FF"},
  {value: 0.2, color: "#7597de"},
  {value: 0.4, color: "#2b1055"},
  {value: 0.6, color: "#0b0a22"},
]

let background = document.createElement("canvas");
let moon = document.createElement("canvas");
let star = document.createElement("canvas");
let contextBg = background.getContext("2d");
let contextMoon = moon.getContext("2d");
let contextStar = star.getContext("2d");
let contextW = (background.width = moon.width = star.width = window.innerWidth);
let contextH =
  (background.height =
  moon.height =
  star.height =
    window.innerHeight);
let gradient = contextBg.createRadialGradient(
  contextW / 2,
  contextH / 2,
  1,
  contextW / 2,
  contextH / 2,
  contextW
);
GRADIENT_BG.forEach(gradientObj => {
  gradient.addColorStop(gradientObj.value, gradientObj.color);
});


class Star {
  constructor(width, height, spacing) {
    this.width = width;
    this.height = height;
    this.spacing = spacing;
    this.maxRadius = 2;
  }

  createStars() {
    const stars = [];

    for (let x = 0; x < this.width; x += this.spacing) {
      for (let y = 0; y < this.height; y += this.spacing) {
        const star = {
          x: x + Math.floor(Math.random() * this.spacing), 
          y: y + Math.floor(Math.random() * this.spacing),
          r: Math.random() * this.maxRadius,
        };
        stars.push(star);
      }
    }

    return stars;
  }
}

function renderBg(fillStyle) {
  contextBg.fillStyle = fillStyle;
  contextBg.fillRect(0, 0, contextW, contextH);
}

function renderStar(x, y, r, fillStyle) {
  contextStar.beginPath();
  contextStar.fillStyle = fillStyle;
  contextStar.arc(x, y, r, 0, Math.PI * 2);
  contextStar.fill();
}

function renderMoon() {
  contextMoon.beginPath();
  contextMoon.arc(contextW / 2, contextH / 2, 200, 0, Math.PI * 2);
  contextMoon.fillStyle = MOON_COLOR;
  contextMoon.fill();
}

function renderCanvas() {
  const starObj = new Star(window.innerWidth, window.innerHeight, 50);
  const stars = starObj.createStars();

  renderBg(gradient)
  stars.forEach(function (star) {
    const x = star.x;
    const y = star.y;
    const r = star.r;
    renderStar(x, y, r, STAR_COLOR);
  });
  renderMoon();
}

renderCanvas();
document.body.appendChild(background);
document.body.appendChild(star);
document.body.appendChild(moon);
