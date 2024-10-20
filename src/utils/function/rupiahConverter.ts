export function rupiahConverter(amount: number): string {
  return "Rp " + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
