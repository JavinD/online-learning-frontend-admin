import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { IInvoice, IUserCourseRequest } from "../../../../interfaces";

export interface IInvoiceDetailState {
  invoice: IInvoice | undefined;
  invoiceError: string | null;
  invoiceLoading: boolean;
}

export const fetchInvoiceDetail = createAsyncThunk<
  IInvoice,
  IUserCourseRequest,
  { rejectValue: string }
>("FETCH_INVOICE_DETAIL", ({ access_token, id }, { rejectWithValue }) => {
  const API_URL_USER_INVOICE =
    process.env.REACT_APP_API_URL_AUTH_USER + "/invoice";

  const idString = id?.toString();

  return fetch(API_URL_USER_INVOICE + "/" + idString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch invoice detail");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: IInvoiceDetailState = {
  invoiceError: null,
  invoiceLoading: false,
  invoice: undefined,
};

export const invoiceDetailSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInvoiceDetail.fulfilled, (state, { payload }) => {
      return { ...state, invoice: payload, invoiceLoading: false };
    });
    builder.addCase(fetchInvoiceDetail.pending, (state) => {
      return { ...state, invoiceError: null, invoiceLoading: true };
    });
    builder.addCase(fetchInvoiceDetail.rejected, (state, { payload }) => {
      return payload
        ? { ...state, invoiceError: payload, invoiceLoading: false }
        : {
            ...state,
            invoiceError: "unknown error",
            invoiceLoading: false,
          };
    });
  },
});

export default invoiceDetailSlice.reducer;
export type InvoiceDetailDispatch = ThunkDispatch<IInvoice, any, AnyAction>;
