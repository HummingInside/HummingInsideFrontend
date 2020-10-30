import { API_URL } from "@/common/config";

export const numberFormat = (inputNumber) => {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getImage = (imgUrl) => {
  return API_URL + '/files/' + imgUrl;
}