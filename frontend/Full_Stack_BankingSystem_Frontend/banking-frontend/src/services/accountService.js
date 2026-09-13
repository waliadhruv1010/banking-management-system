import api from "./api";

export async function getMyAccounts() {
  const response = await api.get("/api/accounts");

  return response.data;
}

export async function createAccount(accountType) {
  const response = await api.post(
    `/api/accounts?accountType=${accountType}`
  );

  return response.data;
}