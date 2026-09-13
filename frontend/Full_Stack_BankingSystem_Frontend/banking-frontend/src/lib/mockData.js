export const currentUser = {
  name: "Dhruv Walia",
  email: "dhruv@example.com",
  initials: "DW",
  role: "customer",
};

export const accounts = [
  {
    id: "acc_savings_01",
    name: "Savings Account",
    kind: "savings",
    number: "4821094500217842",
    balance: 48250.75,
    status: "active",
    trend: 4.2,
    currency: "INR",
  },
  {
    id: "acc_current_01",
    name: "Current Account",
    kind: "current",
    number: "4821094500219930",
    balance: 12980.4,
    status: "active",
    trend: -1.8,
    currency: "INR",
  },
];

export const totalBalance = accounts.reduce(
  (sum, account) => sum + account.balance,
  0
);

export const balanceTrend = 3.1;

export const transactions = [
  {
    id: "txn_01",
    type: "deposit",
    description: "Salary Credit",
    date: "2026-09-06T09:12:00Z",
    amount: 6200,
    balanceAfter: 61231.15,
    account: "Savings Account",
    status: "completed",
  },
  {
    id: "txn_02",
    type: "payment",
    description: "Apartment Rent",
    date: "2026-09-05T14:03:00Z",
    amount: -2150,
    balanceAfter: 55031.15,
    account: "Current Account",
    status: "completed",
  },
  {
    id: "txn_03",
    type: "transfer",
    description: "Transfer to Friend",
    date: "2026-09-04T18:47:00Z",
    amount: -480,
    balanceAfter: 57181.15,
    account: "Current Account",
    status: "completed",
  },
  {
    id: "txn_04",
    type: "deposit",
    description: "Refund",
    date: "2026-09-03T11:20:00Z",
    amount: 312.5,
    balanceAfter: 57661.15,
    account: "Current Account",
    status: "completed",
  },
];

export const monthlySummary = [
  { month: "Apr", deposits: 7200, withdrawals: 4100 },
  { month: "May", deposits: 6800, withdrawals: 5200 },
  { month: "Jun", deposits: 9100, withdrawals: 4700 },
  { month: "Jul", deposits: 8400, withdrawals: 6100 },
  { month: "Aug", deposits: 10200, withdrawals: 5400 },
  { month: "Sep", deposits: 6600, withdrawals: 3000 },
];

export const monthlyStats = {
  income: monthlySummary[monthlySummary.length - 1].deposits,
  spending: monthlySummary[monthlySummary.length - 1].withdrawals,
  transactionCount: transactions.length,
  savingsRate: 42,
};