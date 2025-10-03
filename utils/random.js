function uniqueEmail(prefix = 'qa') {
  const ts = Date.now();
  return `${prefix}+${ts}@example.com`;
}

function currencyToNumber(value) {
  const cleaned = (value || '').replace(/[^0-9.]/g, '');
  return parseFloat(cleaned || '0');
}

module.exports = { uniqueEmail, currencyToNumber };
