const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll("#controls .btn");

let cats = [];
let filteredCats = [];

// fetch cats.json and render
async function loadCats() {
  try {
    const res = await fetch("cats.json");
    cats = await res.json();
    filteredCats = [...cats];
    renderCats(filteredCats);
  } catch(err) {
    grid.innerHTML = "<p>Failed to load cats data.</p>";
    console.error(err);
  }
}

function renderCats(catsArray){
  if(!catsArray.length){
    grid.innerHTML = "<p>No cats found.</p>";
    return;
  }
  grid.innerHTML = catsArray.map(cat=>`
    <div class="card">
      <img src="${cat.image}" alt="${cat.name}" />
      <h3>${cat.name}</h3>
      <p><strong>Age:</strong> ${cat.age}</p>
      <p>${cat.desc}</p>
      <p>${cat.tags ? cat.tags.map(tag=>`<span class="tag">${tag}</span>`).join(" ") : ""}</p>
      <p><strong>Status:</strong> ${cat.status}</p>
    </div>
  `).join("");
}

function filterCats(filter){
  filteredCats = cats.filter(cat => filter === "all" ? true : cat.status === filter);
  applySearch(searchInput.value);
}

function applySearch(query){
  const lowerQuery = query.toLowerCase();
  const result = filteredCats.filter(cat =>
    cat.name.toLowerCase().includes(lowerQuery) ||
    (cat.tags && cat.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
  renderCats(result);
}

filterButtons.forEach(btn=>{
  btn.addEventListener("click",()=>filterCats(btn.dataset.filter));
});

searchInput.addEventListener("input",()=>applySearch(searchInput.value));

loadCats();
