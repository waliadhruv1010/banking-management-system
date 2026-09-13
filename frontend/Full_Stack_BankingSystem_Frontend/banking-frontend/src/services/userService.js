import api from "./api";

export async function getMyProfile() {
  const response = await api.get("/api/users/me");

  return response.data;
}
export async function changePassword(currentPassword, newPassword) {
  const response = await api.post("/api/users/change-password", {
    currentPassword,
    newPassword,
  });

  return response.data;
}