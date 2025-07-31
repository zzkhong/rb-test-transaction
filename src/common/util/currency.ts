export function formatCurrency(value: string | number): string {
  let numberValue: number;

  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9]/g, '');
    numberValue = parseFloat(cleaned || '0') / 100;
  } else {
    numberValue = value;
  }

  if (isNaN(numberValue)) {
    numberValue = 0;
  }

  const formatted = numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return `RM ${formatted}`;
}

export function parseCurrency(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) / 100;
}
