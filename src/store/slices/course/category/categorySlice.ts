import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { ICategory } from "../../../../interfaces";

export interface ICategoryState {
  categories: ICategory[] | undefined;
  categoryError: string | null;
  categoryLoading: boolean;
}

export const fetchCategories = createAsyncThunk<
  ICategory[],
  void,
  { rejectValue: string }
>("FETCH_CATEGORIES", (request, { rejectWithValue }) => {
  const API_URL_CATEGORY = process.env.REACT_APP_API_URL + "/category";

  return fetch(API_URL_CATEGORY, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch categories");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: ICategoryState = {
  categoryError: null,
  categoryLoading: false,
  categories: undefined,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      return { ...state, categories: payload, categoryLoading: false };
    });
    builder.addCase(fetchCategories.pending, (state) => {
      return { ...state, categoryError: null, categoryLoading: true };
    });
    builder.addCase(fetchCategories.rejected, (state, { payload }) => {
      return payload
        ? { ...state, categoryError: payload, categoryLoading: false }
        : {
            ...state,
            categoryError: "unknown error",
            categoryLoading: false,
          };
    });
  },
});

export default categorySlice.reducer;
export type CategoryDispatch = ThunkDispatch<ICategoryState, void, AnyAction>;
