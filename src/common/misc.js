export const numberFormat = (inputNumber) => {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
