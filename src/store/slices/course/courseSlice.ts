import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {
  ICourse,
  IFilterRequest,
  ICoursePagination,
} from "../../../interfaces";

export interface ICourseState {
  courses: ICoursePagination | undefined;
  courseError: string | null;
  courseLoading: boolean;
}

export const fetchCourses = createAsyncThunk<
  ICoursePagination,
  IFilterRequest,
  { rejectValue: string }
>("FETCH_COURSES", (request, { rejectWithValue }) => {
  const API_URL_COURSE = process.env.REACT_APP_API_URL + "/course";

  return fetch(
    API_URL_COURSE +
      `?page=${request.page}&sortBy=${request.sortBy}&sortDir=${request.sortDir}&search=${request.search}&limit=${request.size}&tag=${request.tags}&category=${request.category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch courses");
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

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, { payload }) => {
      return { ...state, courses: payload, courseLoading: false };
    });
    builder.addCase(fetchCourses.pending, (state) => {
      return { ...state, courseError: null, courseLoading: true };
    });
    builder.addCase(fetchCourses.rejected, (state, { payload }) => {
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

export default courseSlice.reducer;
export type CourseDispatch = ThunkDispatch<ICourse, any, AnyAction>;
