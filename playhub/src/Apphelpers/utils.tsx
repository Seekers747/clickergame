export const roundNumber = (num: number) => parseFloat(num.toFixed(2))

export function formatNumber(num: number): string {
if (num < 1000) return num.toFixed(2).replace(/\.00$/, '');
const units = ['K', 'M', 'B', 'T', 'Q'];
let unitIndex = -1;
while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
}
return `${num.toFixed(2).replace(/\.00$/, '')}${units[unitIndex]}`;
}