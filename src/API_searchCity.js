const API_KEY = cab870990fda438db75125235251909;

export async function searchCitiesAPI(query) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&days=3&lang=de`
  );
  if (!response.ok) {
    throw new Error("Fehler beim Auslesen der Städte");
  }

  return await response.json();
}
