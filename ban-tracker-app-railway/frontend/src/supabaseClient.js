const API_URL = "https://djs-app-production.up.railway.app";

// Example usage:
export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();
  return data;
}
