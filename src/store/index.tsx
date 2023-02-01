import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import courseReducer from "./slices/course/courseSlice";
import categoryReducer from "./slices/course/category/categorySlice";
import courseDetailReducer from "./slices/course/courseDetailSlice";
import trendingCourseReducer from "./slices/course/trendingCourseSlice";
import cartReducer from "./slices/cart/cartSlice";
import tagReducer from "./slices/course/tag/tagSlice";
import userCourseDetailReducer from "./slices/user/course/userCourseDetailSlice";
import userBookmarkDetailReducer from "./slices/user/bookmark/userBookmarkDetailSlice";
import invoiceReducer from "./slices/user/invoice/invoiceSlice";
import invoiceDetailReducer from "./slices/user/invoice/invoiceDetailSlice";
import userBookmarkReducer from "./slices/user/bookmark/userBookmarkSlice";
import userCourseReducer from "./slices/user/course/userCourseSlice";
import userVoucherReducer from "./slices/user/voucher/userVoucherSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    courseDetail: courseDetailReducer,
    userCourseDetail: userCourseDetailReducer,
    trendingCourse: trendingCourseReducer,
    user: userReducer,
    tag: tagReducer,
    category: categoryReducer,
    cart: cartReducer,
    userBookmarkDetail: userBookmarkDetailReducer,
    invoice: invoiceReducer,
    invoiceDetail: invoiceDetailReducer,
    userCourse: userCourseReducer,
    userBookmark: userBookmarkReducer,
    userVoucher: userVoucherReducer,
  },
  middleware: [logger, thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
