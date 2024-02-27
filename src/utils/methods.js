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

function formatTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const formattedTime = [];
  if (hours > 0) {
    formattedTime.push(`${hours}h`);
  }
  if (minutes > 0) {
    formattedTime.push(`${minutes}m`);
  }

  return formattedTime.join(" ");
}

export { formatCurrency, formatNumber, formatTime };
