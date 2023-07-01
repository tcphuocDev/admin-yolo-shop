import * as moment from "moment";

export const formatTime = (time) => moment(time).format("DD/MM/YYYY HH:mm");

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const formatMoney = (input = 0) =>
  input?.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

export const ROLE = {
  USER: 0,
  ADMIN: 1,
};

export const formatTitle = (title, length = 80) => {
  if (title === "undefined") return "";
  if (title?.length > length) {
    let flag = title.trim().lastIndexOf(" ", length);

    const cloneTitle = title.trim().slice(0, flag !== -1 ? flag : length);
    return `${cloneTitle} ${
      cloneTitle.length === title.trim().length ? "" : "..."
    } `;
  }
  return title;
};
