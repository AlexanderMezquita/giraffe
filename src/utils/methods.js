const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "DOP",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

const formatCurrency = (value) => {
  return formatter.format(value);
};

function formatNumber(number) {
  var pattern = /^(\d{3})-?(\d{3})-?(\d{4})$/;
  var formattedNumber = number.replace(pattern, "$1-$2-$3");
  return formattedNumber;
}

export { formatCurrency, formatNumber };
