import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import categoryReducer from "./slices/course/category/categorySlice";
import courseReducer from "./slices/course/courseSlice";
import tagReducer from "./slices/course/tag/tagSlice";
import invoiceDetailReducer from "./slices/invoice/invoiceDetailSlice";
import invoiceReducer from "./slices/invoice/invoiceSlice";
import userReducer from "./slices/admin/userSlice";
import courseDetailRedcuer from "./slices/course/courseDetailSlice";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    courseDetail: courseDetailRedcuer,
    user: userReducer,
    tag: tagReducer,
    category: categoryReducer,
    invoice: invoiceReducer,
    invoiceDetail: invoiceDetailReducer,
  },
  middleware: [logger, thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
