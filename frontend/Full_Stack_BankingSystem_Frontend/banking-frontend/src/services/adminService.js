import api from "./api";

export async function getAdminDashboard() {
  const response = await api.get("/api/admin/dashboard");
  return response.data;
}

export async function getAdminUsers() {
  const response = await api.get("/api/admin/users");
  return response.data;
}

export async function getAdminAccounts() {
  const response = await api.get("/api/admin/accounts");
  return response.data;
}

export async function blockAdminAccount(accountNumber) {
  const response = await api.put(
    `/api/admin/accounts/${accountNumber}/block`
  );
  return response.data;
}

export async function unblockAdminAccount(accountNumber) {
  const response = await api.put(
    `/api/admin/accounts/${accountNumber}/unblock`
  );
  return response.data;
}

export async function closeAdminAccount(accountNumber) {
  const response = await api.put(
    `/api/admin/accounts/${accountNumber}/close`
  );
  return response.data;
}

export async function getAdminTransactions() {
  const response = await api.get("/api/admin/transactions");
  return response.data;
}