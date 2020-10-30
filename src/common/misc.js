import { API_URL } from "@/common/config";

export const numberFormat = (inputNumber) => {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getFullDigit = (digit) => {
  return (digit < 10 ? '0' : '') + digit
}

export const dateFormat = (dateString) => {
  const date = new Date(dateString)
  let formatDate = date.getFullYear()+'.'
  formatDate += getFullDigit(date.getMonth())+'.'
  formatDate += getFullDigit(date.getDay())+' / '
  formatDate += getFullDigit(date.getHours())+':'
  formatDate += getFullDigit(date.getMinutes())
  return formatDate;
}

export const getImage = (imgUrl) => {
  return API_URL + '/files/' + imgUrl;
}