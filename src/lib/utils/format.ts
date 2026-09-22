/**
 * Format helpers.
 */

export function formatCurrency(
  amount: number,
  currency: string = "ZMW",
  locale: string = "en-ZM"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

/**
 * Returns the current year. Footer copyright uses this so the year stays
 * accurate without manual updates.
 */
export function currentYear(): number {
  return new Date().getFullYear();
}