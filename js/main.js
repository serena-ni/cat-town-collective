const grid = document.getElementById('grid');
const search = document.getElementById('search');
let cats = [];

async function loadCats(){
  try{
    const res = await fetch('data/cats.json');
    cats = await res.json();
    renderCats(cats);
  }catch(e){
    grid.innerHTML = '<p>Failed to load cats.json — serve from local server or GitHub Pages.</p>';
    console.error(e);
  }
}

function renderCats(list){
  grid.innerHTML = '';
  if(!list.length) {
    grid.innerHTML = '<p>No cats yet. Add one via Contribute!</p>';
    return;
  }
  list.forEach(c=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <img src="${c.image}" alt="${c.name}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg'" />
      <h3>${c.name}</h3>
      <p>${c.age ? c.age + ' • ' : ''}${c.status || ''}</p>
      <p class="hint">${c.desc || ''}</p>
    `;
    grid.appendChild(card);
  });
}

document.querySelectorAll('.btn[data-filter], button.btn').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const f = e.target.dataset.filter || e.target.textContent.toLowerCase();
    if(f==='all') renderCats(cats);
    else renderCats(cats.filter(c=> (c.status||'').toLowerCase()===f));
  });
});

search?.addEventListener('input', e=>{
  const q = e.target.value.toLowerCase();
  renderCats(cats.filter(c=> 
    (c.name+c.desc+(c.tags||'')).toLowerCase().includes(q)
  ));
});

loadCats();
