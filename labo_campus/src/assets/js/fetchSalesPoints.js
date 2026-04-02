// fetchSalesPoints.js
export default async function getCampusSalesPoints() {
  try {
    const res = await fetch('../data/points-of-sale.json');

    if (!res.ok) {
      throw new Error(`Impossible de charger les points de vente : ${res.status}`);
    }

    const points = await res.json();
    console.log('Points de vente chargés', points);
    return points;
  } catch (err) {
    console.error('fetchSalesPoints.js:', err);
    throw err;
  }
}