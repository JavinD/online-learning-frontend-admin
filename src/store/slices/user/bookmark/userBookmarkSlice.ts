import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {
  IFilterRequest,
  IUserBookmarkPagination,
} from "../../../../interfaces";

export interface IUserBookmarkState {
  course: IUserBookmarkPagination | undefined;
  courseError: string | null;
  courseLoading: boolean;
}

export const fetchUserBookmark = createAsyncThunk<
  IUserBookmarkPagination,
  IFilterRequest,
  { rejectValue: string }
>("FETCH_USER_BOOKMARKS", (request, { rejectWithValue }) => {
  const API_URL_USER_BOOKMARK =
    process.env.REACT_APP_API_URL_AUTH_USER + "/bookmark";

  return fetch(
    API_URL_USER_BOOKMARK +
      `?page=${request.page}&sortBy=${request.sortBy}&sortDir=${request.sortDir}&search=${request.search}&limit=${request.size}&tag=${request.tags}&category=${request.category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + request.access_token,
      },
    }
  )
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

const initialState: IUserBookmarkState = {
  courseError: null,
  courseLoading: false,
  course: undefined,
};

export const userBookmarkSlice = createSlice({
  name: "user bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserBookmark.fulfilled, (state, { payload }) => {
      return { ...state, course: payload, courseLoading: false };
    });
    builder.addCase(fetchUserBookmark.pending, (state) => {
      return { ...state, courseError: null, courseLoading: true };
    });
    builder.addCase(fetchUserBookmark.rejected, (state, { payload }) => {
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

export default userBookmarkSlice.reducer;
export type UserBookmarkDispatch = ThunkDispatch<
  IUserBookmarkPagination,
  any,
  AnyAction
>;
