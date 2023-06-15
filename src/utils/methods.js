const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "DOP",
  maximumFractionDigits: 0,
});

const formatCurrency = (value) => {
  return formatter.format(value);
};

export { formatCurrency };
