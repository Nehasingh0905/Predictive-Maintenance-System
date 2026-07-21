import { apiRequest } from "./api";

export async function getAlerts() {
  return apiRequest("/alerts");
}

export async function resolveAlert(alertId) {
  return apiRequest(`/alerts/${alertId}`, {
    method: "PUT",
  });
}