import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { IUserCourse, IUserCourseRequest } from "../../../../interfaces";

export interface IUserCourseDetailState {
  course: IUserCourse | undefined;
  courseError: string | null;
  courseLoading: boolean;
}

export const fetchUserCourseDetail = createAsyncThunk<
  IUserCourse,
  IUserCourseRequest,
  { rejectValue: string }
>("FETCH_USER_COURSE", ({ access_token, id }, { rejectWithValue }) => {
  const API_URL_USER_COURSE =
    process.env.REACT_APP_API_URL_AUTH_USER + "/course";

  const idString = id?.toString();

  return fetch(API_URL_USER_COURSE + "/" + idString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch user course");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: IUserCourseDetailState = {
  courseError: null,
  courseLoading: false,
  course: undefined,
};

export const userCourseDetailSlice = createSlice({
  name: "user course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserCourseDetail.fulfilled, (state, { payload }) => {
      return { ...state, course: payload, courseLoading: false };
    });
    builder.addCase(fetchUserCourseDetail.pending, (state) => {
      return { ...state, courseError: null, courseLoading: true };
    });
    builder.addCase(fetchUserCourseDetail.rejected, (state, { payload }) => {
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

export default userCourseDetailSlice.reducer;
export type UserCourseDetailDispatch = ThunkDispatch<
  IUserCourse,
  any,
  AnyAction
>;
