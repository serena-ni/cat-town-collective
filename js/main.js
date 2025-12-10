const grid = document.getElementById("grid");
const filterBtns = document.querySelectorAll("button[data-filter]");
const searchInput = document.getElementById("search");

let catsData = [];

// fetch cats.json after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/cats.json")
    .then(res => res.json())
    .then(data => {
      catsData = data;
      renderCats(catsData);
    })
    .catch(err => {
      console.error("failed to load cats data", err);
      grid.innerHTML = "<p>failed to load cats data.</p>";
    });
});

function renderCats(cats) {
  grid.innerHTML = "";

  if (!cats.length) {
    grid.innerHTML = "<p>no cats found.</p>";
    return;
  }

  cats.forEach(cat => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}" />
      <h3>${cat.name}</h3>
      <p><strong>Age:</strong> ${cat.age}</p>
      <p>${cat.desc}</p>
      <p><strong>Status:</strong> ${cat.status}</p>
    `;

    grid.appendChild(card);
  });
}

// filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    let filtered = catsData;

    if (filter === "available") filtered = catsData.filter(c => c.status === "available");
    else if (filter === "adopted") filtered = catsData.filter(c => c.status === "adopted");

    renderCats(filtered);
  });
});

// search
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  renderCats(
    catsData.filter(cat =>
      cat.name.toLowerCase().includes(term) ||
      (cat.tags && cat.tags.some(tag => tag.toLowerCase().includes(term)))
    )
  );
});
