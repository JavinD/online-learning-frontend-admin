import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { IFilterRequest, IUserCoursePagination } from "../../../../interfaces";

export interface IUserCourseState {
  course: IUserCoursePagination | undefined;
  courseError: string | null;
  courseLoading: boolean;
}

export const fetchUserCourse = createAsyncThunk<
  IUserCoursePagination,
  IFilterRequest,
  { rejectValue: string }
>("FETCH_USER_COURSES", (request, { rejectWithValue }) => {
  const API_URL_USER_COURSE =
    process.env.REACT_APP_API_URL_AUTH_USER + "/course";

  return fetch(
    API_URL_USER_COURSE +
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
      if (!response.ok) throw new Error("failed to fetch user courses");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: IUserCourseState = {
  courseError: null,
  courseLoading: false,
  course: undefined,
};

export const userCourseSlice = createSlice({
  name: "user course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserCourse.fulfilled, (state, { payload }) => {
      return { ...state, course: payload, courseLoading: false };
    });
    builder.addCase(fetchUserCourse.pending, (state) => {
      return { ...state, courseError: null, courseLoading: true };
    });
    builder.addCase(fetchUserCourse.rejected, (state, { payload }) => {
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

export default userCourseSlice.reducer;
export type UserCourseDispatch = ThunkDispatch<
  IUserCoursePagination,
  any,
  AnyAction
>;
