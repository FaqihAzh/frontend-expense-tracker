export function formatRupiah(amount, showPrefix = true) {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return showPrefix ? 'Rp 0' : '0';
  
  const formatted = Math.abs(numAmount)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return showPrefix ? `Rp ${formatted}` : formatted;
}

export function formatNumber(amount, decimals = 0) {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return '0';
  
  return numAmount
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function parseRupiah(rupiahString) {
  if (!rupiahString) return 0;
  
  // Remove "Rp", spaces, and dots
  const cleaned = rupiahString
    .replace(/Rp/g, '')
    .replace(/\s/g, '')
    .replace(/\./g, '');
  
  return parseFloat(cleaned) || 0;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatCompactNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'M';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'Jt';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' Rb';
  }
  return num.toString();
}