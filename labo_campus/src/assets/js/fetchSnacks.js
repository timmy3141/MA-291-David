// fetchSnacks.js
export default async function getSnacksData() {
  try {
    const res = await fetch('../data/snacks.json');
    if (!res.ok) {
      throw new Error(`Erreur lors du chargement des snacks: ${res.status}`);
    }

    const data = await res.json();
    console.log('Snacks chargés avec succès', data);
    return data;
  } catch (err) {
    console.error('fetchSnacks.js:', err);
    throw err;
  }
}