const TEMPERATURE_TYPE = {
  Celsius: 'C',
  Fahrenheit: 'F',
  Kelvin: 'K',
  Rankine: 'Ra',
  Reaumur: 'Re',
}

const tempc = (value, from, to) => {
  value = Number(value);
  switch (from) {
    case TEMPERATURE_TYPE.Fahrenheit:
      value = (value - 32) / 1.8;
      break;
    case TEMPERATURE_TYPE.Kelvin:
      value = value - 273.15;
      break;
    case TEMPERATURE_TYPE.Rankine:
      value = value / 1.8 - 273.15;
      break;
    case TEMPERATURE_TYPE.Reaumur:
      value = value * 1.25;
      break;
  }
  switch (to) {
    case TEMPERATURE_TYPE.Fahrenheit:
      value = value * 1.8 + 32
      break;
    case TEMPERATURE_TYPE.Kelvin:
      value = value + 273.15;
      break;
    case TEMPERATURE_TYPE.Rankine:
      value = (value + 273.15) * 1.8;
      break;
    case TEMPERATURE_TYPE.Reaumur:
      value = value / 1.25;
      break;
  }
  return value.toString();
};

module.exports = {tempc, TEMPERATURE_TYPE};
