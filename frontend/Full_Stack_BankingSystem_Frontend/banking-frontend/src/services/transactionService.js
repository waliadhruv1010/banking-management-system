import api from "./api";

export async function depositMoney(accountNumber, amount) {
  const response = await api.post(
    `/api/transactions/${accountNumber}/deposit`,
    {
      amount: Number(amount),
    }
  );

  return response.data;
}

export async function withdrawMoney(accountNumber, amount) {
  const response = await api.post(
    `/api/transactions/${accountNumber}/withdraw`,
    {
      amount: Number(amount),
    }
  );

  return response.data;
}

export async function transferMoney(
  senderAccountNumber,
  receiverAccountNumber,
  amount
) {
  const response = await api.post(
    "/api/transactions/transfer",
    {
      senderAccountNumber: Number(senderAccountNumber),
      receiverAccountNumber: Number(receiverAccountNumber),
      amount: Number(amount),
    }
  );

  return response.data;
}

export async function getTransactionHistory(
  accountNumber,
  page = 0,
  size = 10
) {
  const response = await api.get(
    `/api/transactions/${accountNumber}/history`,
    {
      params: {
        page,
        size,
      },
    }
  );

  return response.data;
}