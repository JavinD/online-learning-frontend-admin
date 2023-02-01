import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { IUserVoucher } from "../../../../interfaces";

export interface IUserVoucherState {
  voucher: IUserVoucher[] | undefined;
  voucherError: string | null;
  voucherLoading: boolean;
}

export const fetchUserVoucher = createAsyncThunk<
  IUserVoucher[],
  string,
  { rejectValue: string }
>("FETCH_USER_COURSES", (token, { rejectWithValue }) => {
  const API_URL_USER_VOUCHER =
    process.env.REACT_APP_API_URL_AUTH_USER + "/voucher";

  return fetch(API_URL_USER_VOUCHER, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch user vouchers");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: IUserVoucherState = {
  voucherError: null,
  voucherLoading: false,
  voucher: undefined,
};

export const userVoucherSlice = createSlice({
  name: "user vouchers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserVoucher.fulfilled, (state, { payload }) => {
      return { ...state, voucher: payload, voucherLoading: false };
    });
    builder.addCase(fetchUserVoucher.pending, (state) => {
      return { ...state, voucherError: null, voucherLoading: true };
    });
    builder.addCase(fetchUserVoucher.rejected, (state, { payload }) => {
      return payload
        ? { ...state, voucherError: payload, voucherLoading: false }
        : {
            ...state,
            voucherError: "unknown error",
            voucherLoading: false,
          };
    });
  },
});

export default userVoucherSlice.reducer;
export type UserVoucherDispatch = ThunkDispatch<IUserVoucher, any, AnyAction>;
