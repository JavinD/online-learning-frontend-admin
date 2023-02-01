import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { IUserBookmark, IUserCourseRequest } from "../../../../interfaces";

export interface IUserBookmarkDetailState {
  course: IUserBookmark | undefined;
  courseError: string | null;
  courseLoading: boolean;
}

export const fetchUserBookmarkDetail = createAsyncThunk<
  IUserBookmark,
  IUserCourseRequest,
  { rejectValue: string }
>("FETCH_USER_BOOKMARK", ({ access_token, id }, { rejectWithValue }) => {
  const API_URL_USER_BOOKMARK =
    process.env.REACT_APP_API_URL_AUTH_USER + "/bookmark";

  const idString = id?.toString();

  return fetch(API_URL_USER_BOOKMARK + "/" + idString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch user bookmark");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: IUserBookmarkDetailState = {
  courseError: null,
  courseLoading: false,
  course: undefined,
};

export const userBookmarkDetailSlice = createSlice({
  name: "user bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserBookmarkDetail.fulfilled, (state, { payload }) => {
      return { ...state, course: payload, courseLoading: false };
    });
    builder.addCase(fetchUserBookmarkDetail.pending, (state) => {
      return { ...state, courseError: null, courseLoading: true };
    });
    builder.addCase(fetchUserBookmarkDetail.rejected, (state, { payload }) => {
      return payload
        ? { ...state, courseError: payload, courseLoading: false }
        : {
            ...state,
            courseError: "unknown error",
            courseLoading: false,
          };
    });
  },
});

export default userBookmarkDetailSlice.reducer;
export type UserBookmarkDetailDispatch = ThunkDispatch<
  IUserBookmark,
  any,
  AnyAction
>;
