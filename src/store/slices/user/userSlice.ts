import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces";

export interface IUserState {
  user: IUser | null;
  userLoading: boolean;
  userError: string | null;
}

export const fetchUserDetails = createAsyncThunk<
  IUser,
  string,
  { rejectValue: string }
>("FETCH_USER_DETAILS", (token, { rejectWithValue }) => {
  const API_URL_USER = process.env.REACT_APP_API_URl_AUTH + "/user";

  return fetch(API_URL_USER, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch user details");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: IUserState = {
  user: null,
  userLoading: false,
  userError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, { payload }) => {
      return { ...state, user: payload, userLoading: false };
    });
    builder.addCase(fetchUserDetails.pending, (state) => {
      return { ...state, userError: null, userLoading: true };
    });
    builder.addCase(fetchUserDetails.rejected, (state, { payload }) => {
      return payload
        ? { ...state, userError: payload, userLoading: false }
        : { ...state, userError: "unknown error", userLoading: false };
    });
  },
});

export default userSlice.reducer;
export type UserDispatch = ThunkDispatch<IUserState, any, AnyAction>;
