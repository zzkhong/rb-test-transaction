export function formatCurrency(value: string | number): string {
  const cleaned = String(value).replace(/[^0-9]/g, '');
  const numberValue = parseFloat(cleaned) / 100;
  return `${numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export function parseCurrency(raw: string): number {
  const parsed = parseFloat(raw);
  if (isNaN(parsed)) return 0;
  return parsed / 100;
}
