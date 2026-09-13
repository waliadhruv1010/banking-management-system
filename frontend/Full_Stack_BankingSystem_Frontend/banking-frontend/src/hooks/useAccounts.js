import { useEffect, useState } from "react";
import { getMyAccounts } from "../services/accountService";

export function useAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [error, setError] = useState("");

  async function loadAccounts() {
    try {
      setLoadingAccounts(true);
      setError("");

      const response = await getMyAccounts();

      if (response.success) {
        setAccounts(response.data || []);
      } else {
        setError(response.message || "Unable to load accounts.");
      }
    } catch (error) {
      console.error("Unable to load accounts:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load accounts."
      );
    } finally {
      setLoadingAccounts(false);
    }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  return {
    accounts,
    loadingAccounts,
    error,
    loadAccounts,
  };
}