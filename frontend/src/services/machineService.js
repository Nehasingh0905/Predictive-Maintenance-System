import API_BASE_URL from "./api";

export const getMachines = async () => {
  const response = await fetch(`${API_BASE_URL}/machines`);

  if (!response.ok) {
    throw new Error("Unable to fetch machines");
  }

  return response.json();
};