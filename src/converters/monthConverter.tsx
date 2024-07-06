export function monthConverter(month: number): string {
  const today = new Date(2000, month);
  const textMonth = today.toLocaleString('default', { month: 'long' });
  return textMonth;
}
