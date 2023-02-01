import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { ICourseDetail, ICourseRequest } from "../../../interfaces";

export interface ICourseDetailState {
  course: ICourseDetail | undefined;
  courseError: string | null;
  courseLoading: boolean;
}

export const fetchCourse = createAsyncThunk<
  ICourseDetail,
  ICourseRequest,
  { rejectValue: string }
>("FETCH_COURSE", ({ access_token, slug }, { rejectWithValue }) => {
  const API_URL_COURSE = process.env.REACT_APP_API_URl_AUTH + "/course";

  return fetch(API_URL_COURSE + "/" + slug, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch course details");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: ICourseDetailState = {
  courseError: null,
  courseLoading: false,
  course: undefined,
};

export const courseDetailSlice = createSlice({
  name: "course detail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.fulfilled, (state, { payload }) => {
      return { ...state, course: payload, courseLoading: false };
    });
    builder.addCase(fetchCourse.pending, (state) => {
      return { ...state, courseError: null, courseLoading: true };
    });
    builder.addCase(fetchCourse.rejected, (state, { payload }) => {
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

export default courseDetailSlice.reducer;
export type CourseDetailDispatch = ThunkDispatch<ICourseDetail, any, AnyAction>;
