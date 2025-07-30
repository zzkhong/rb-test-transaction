export function formatCurrency(value: string): string {
  const cleaned = value.replace(/[^0-9]/g, '');
  const numberValue = parseFloat(cleaned) / 100;
  return `RM ${numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
