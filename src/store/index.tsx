import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./slices/admin/userSlice";
import categoryReducer from "./slices/course/category/categorySlice";
import courseDetailRedcuer from "./slices/course/courseDetailSlice";
import courseReducer from "./slices/course/courseSlice";
import tagReducer from "./slices/course/tag/tagSlice";
import invoiceDetailReducer from "./slices/invoice/invoiceDetailSlice";
import invoiceReducer from "./slices/invoice/invoiceSlice";

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
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
