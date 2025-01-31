// Prizes array
const prizes = [
  "20% Discount",
  "RM10 Zus Coffee Voucher",
  "10 Candidates Profile"
];

// Randomly select a prize
const selectedPrize = prizes[Math.floor(Math.random() * prizes.length)];
document.getElementById('prizeText').innerText = `🎉 You won: ${selectedPrize} 🎉`;

// Set up canvas for scratch card
const canvas = document.getElementById("scratchCard");
const ctx = canvas.getContext("2d");

// Scratch card dimensions
const width = canvas.width;
const height = canvas.height;

// Draw initial scratch card cover
ctx.fillStyle = "#aaa";
ctx.fillRect(0, 0, width, height);
ctx.fillStyle = "#fff";
ctx.font = "20px Arial";
ctx.fillText("Scratch Here", width / 4, height / 2);

// Scratch functionality
let isScratching = false;

canvas.addEventListener("mousedown", () => (isScratching = true));
canvas.addEventListener("mouseup", () => (isScratching = false));
canvas.addEventListener("mousemove", (e) => {
  if (isScratching) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    checkScratchCompletion();
  }
});

// Check if the scratch card is sufficiently cleared
function checkScratchCompletion() {
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  let clearedPixels = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) clearedPixels++; // Alpha channel cleared
  }

  const clearedPercentage = (clearedPixels / (width * height)) * 100;
  if (clearedPercentage > 50) {
    revealPrize();
  }
}

// Reveal prize
function revealPrize() {
  canvas.style.display = "none";
  document.getElementById("prizeContainer").style.display = "block";
}
