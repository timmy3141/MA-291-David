// main.js refactorisé
import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

// Récupération des éléments DOM
const btnSnacks = document.querySelector('#load-snacks-btn');
const containerSnacks = document.querySelector('#snacks-container');
const sectionSnacks = containerSnacks.parentElement;
const feedbackSnacks = document.querySelector('#feedback');

const btnSales = document.querySelector('#toggle-sales-btn');
const sectionSales = document.querySelector('#sales-section');
const containerSales = document.querySelector('#sales-container');
const feedbackSales = document.querySelector('#sales-feedback');

// États
let isSnacksVisible = false;
let areSalesLoaded = false;
let isSalesVisible = false;

// Masquer les sections au démarrage
hideSection(sectionSnacks);
hideSection(sectionSales);

// Gestion du bouton snacks
btnSnacks.addEventListener('click', async () => {
  if (!isSnacksVisible) {
    feedbackSnacks.textContent = '';
    try {
      const snacks = await fetchSnacks();
      renderSnacks(snacks);
      showSection(sectionSnacks);
      btnSnacks.textContent = 'Clear snacks';
      isSnacksVisible = true;
    } catch (err) {
      console.error(err);
      feedbackSnacks.textContent = 'Impossible de charger les snacks.';
    }
  } else {
    containerSnacks.innerHTML = '';
    hideSection(sectionSnacks);
    btnSnacks.textContent = 'Load snacks';
    isSnacksVisible = false;
  }
});

// Fonction pour afficher les snacks
function renderSnacks(snacks) {
  containerSnacks.innerHTML = snacks.map(snack => `
    <article class="card">
      <img src="${snack.imageUrl}" alt="${snack.alt}">
      <div class="card-content">
        <h3>${snack.name.toUpperCase()}</h3>
        <p>${snack.description}</p>
        <p class="price">CHF ${snack.price.toFixed(2)}</p>
        <span class="fake-action">Commander</span>
      </div>
    </article>
  `).join('');
}

// Gestion du bouton points de vente
btnSales.addEventListener('click', async () => {
  if (!areSalesLoaded) {
    await fetchAndRenderSalesPoints();
  }

  isSalesVisible = !isSalesVisible;
  if (isSalesVisible) {
    showSection(sectionSales);
    btnSales.textContent = 'Clear les points de vente';
  } else {
    hideSection(sectionSales);
    btnSales.textContent = 'Afficher les points de vente';
  }
});

// Chargement des points de vente
async function fetchAndRenderSalesPoints() {
  feedbackSales.textContent = '';
  try {
    const salesPoints = await fetchSalesPoints();
    renderSalesPoints(salesPoints);
    areSalesLoaded = true;
  } catch (err) {
    console.error(err);
    feedbackSales.textContent = 'Impossible de charger les points de vente.';
  }
}

// Fonction pour afficher les points de vente
function renderSalesPoints(points) {
  containerSales.innerHTML = points.map(point => `
    <article class="sales-point-card">
      <h3>${point.building}</h3>
      <p><strong>Salle :</strong> ${point.room}</p>
      <p><strong>Horaires :</strong> ${point.openingHours}</p>
      <p><strong>Email :</strong> ${point.email}</p>
    </article>
  `).join('');
}

// Helpers pour gérer l'affichage
function showSection(section) {
  section.style.display = 'block';
}

function hideSection(section) {
  section.style.display = 'none';
}