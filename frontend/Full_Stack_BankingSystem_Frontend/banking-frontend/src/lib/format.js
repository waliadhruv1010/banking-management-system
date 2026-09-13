export function formatCurrency(
  amount,
  options = {}
) {
  const {
    signed = false,
    currency = "USD",
  } = options;

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  if (signed) {
    return `${amount < 0 ? "-" : "+"}${formatted}`;
  }

  return `${amount < 0 ? "-" : ""}${formatted}`;
}

export function maskCurrency() {
  return "••••••";
}

export function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatTime(iso) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatLongDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function maskAccountNumber(value) {
  const last4 = value.slice(-4);
  return `•••• •••• •••• ${last4}`;
}