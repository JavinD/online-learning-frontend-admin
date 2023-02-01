import { toast } from "react-toastify";
import { ICartItem, ICourse, IUserCourse } from "../interfaces";

export const isAlphaNumeric = (str: string): boolean => {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isNumber = (str: string): boolean => {
  if (typeof str !== "string") {
    return false;
  }

  if (str.trim() === "") {
    return false;
  }

  return !Number.isNaN(Number(str));
};

export const isCourseInCart = (
  courseId: string,
  cart: ICartItem[]
): boolean => {
  return cart.some((item) => item.course_id.toString() === courseId);
};

export const isCourseOwned = (
  courseId: string,
  ownedCourses: IUserCourse[]
): boolean => {
  return ownedCourses.some((item) => item.course_id.toString() === courseId);
};

export const toRupiah = (price: number): string => {
  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

export const countCartTotal = (cart: ICartItem[] | undefined): number => {
  if (!cart) {
    return 0;
  }

  return cart.reduce((acc, item) => {
    return acc + item.course.price;
  }, 0);
};

export const countTotalPrice = (
  price: number,
  discount: number,
  voucher: number
): number => {
  const total = price - price * discount - voucher;

  if (total < 0) {
    return 0;
  }

  return total;
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastFailed = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const trimSummary = (str: string): string => {
  const length = 53;

  if (str.length > length) {
    return str.substring(0, length) + "...";
  }

  return str;
};

export const toDate = (str: string | undefined) => {
  if (str === undefined) {
    return "";
  }
  const date = new Date(str);
  return (
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }) +
    " - " +
    date.getDate() +
    " " +
    date.toLocaleString("default", { month: "long" }) +
    " " +
    date.getFullYear()
  );
};

export const isDateExpired = (str: string | Date | undefined) => {
  if (str === undefined) {
    return false;
  }
  const date = new Date(str);
  return date < new Date();
};
