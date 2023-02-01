import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { ICourse } from "../../../interfaces";

export interface ICourseState {
  courses: ICourse[] | undefined;
  courseError: string | null;
  courseLoading: boolean;
}

export const fetchTrendingCourses = createAsyncThunk<
  ICourse[],
  void,
  { rejectValue: string }
>("FETCH_TRENDING_COURSES", (request, { rejectWithValue }) => {
  const API_URL_COURSE_TRENDING =
    process.env.REACT_APP_API_URL + "/course/trending";

  return fetch(API_URL_COURSE_TRENDING, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch trending courses");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: ICourseState = {
  courseError: null,
  courseLoading: false,
  courses: undefined,
};

export const trendingCourseSlice = createSlice({
  name: "trending courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingCourses.fulfilled, (state, { payload }) => {
      return { ...state, courses: payload, courseLoading: false };
    });
    builder.addCase(fetchTrendingCourses.pending, (state) => {
      return { ...state, courseError: null, courseLoading: true };
    });
    builder.addCase(fetchTrendingCourses.rejected, (state, { payload }) => {
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

export default trendingCourseSlice.reducer;
export type TrendingCourseDispatch = ThunkDispatch<ICourse, any, AnyAction>;
