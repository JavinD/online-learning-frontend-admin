import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {
  IInvoice,
  IFilterRequest,
  IInvoicePagination,
} from "../../../../interfaces";

export interface IInvoiceState {
  invoices: IInvoicePagination | undefined;
  invoiceError: string | null;
  invoiceLoading: boolean;
}

export const fetchInvoices = createAsyncThunk<
  IInvoicePagination,
  IFilterRequest,
  { rejectValue: string }
>("FETCH_INVOICES", (request, { rejectWithValue }) => {
  const API_URL_USER_INVOICE =
    process.env.REACT_APP_API_URL_AUTH_USER + "/invoice";

  return fetch(
    API_URL_USER_INVOICE +
      `?page=${request.page}&sortBy=${request.sortBy}&sortDir=${request.sortDir}&limit=${request.size}&tag=${request.tags}&status=${request.status}&transaction_date=${request.last}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + request.access_token,
      },
    }
  )
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch invoices");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: IInvoiceState = {
  invoiceError: null,
  invoiceLoading: false,
  invoices: undefined,
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.fulfilled, (state, { payload }) => {
      return { ...state, invoices: payload, invoiceLoading: false };
    });
    builder.addCase(fetchInvoices.pending, (state) => {
      return { ...state, invoiceError: null, invoiceLoading: true };
    });
    builder.addCase(fetchInvoices.rejected, (state, { payload }) => {
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

export default invoiceSlice.reducer;
export type InvoiceDispatch = ThunkDispatch<IInvoice, any, AnyAction>;
