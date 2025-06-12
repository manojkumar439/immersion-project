const addBtn = document.getElementById("addBtn");
const barsContainer = document.getElementById("barsContainer");

const colors = [
  
  "#10b981"
];

let colorIndex = 0;

addBtn.addEventListener("click", () => {
  const container = document.createElement("div");
  container.className = "progress-container";

  const bar = document.createElement("div");
  bar.className = "progress-bar";
  bar.style.backgroundColor = colors[colorIndex % colors.length];
  colorIndex++;

  container.appendChild(bar);
  barsContainer.appendChild(container);

  let width = 0;
  const duration = 2000;
  const interval = 20;
  const step = 100 / (duration / interval);

  const timer = setInterval(() => {
    width += step;
    bar.style.width = `${Math.min(width, 100)}%`;
    if (width >= 100) clearInterval(timer);
  }, interval);
});
