export function formatCurrency(value: string | number): string {
  const cleaned = String(value).replace(/[^0-9]/g, '');

  // separator and 2 digit decimal
  const numberValue = (parseFloat(cleaned) / 100)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return `RM ${numberValue}`;
}

export function parseCurrency(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) / 100;
}
