import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { ITag } from "../../../../interfaces";

export interface ITagState {
  tags: ITag[] | undefined;
  tagError: string | null;
  tagLoading: boolean;
}

export const fetchTags = createAsyncThunk<
  ITag[],
  void,
  { rejectValue: string }
>("FETCH_TAGS", (request, { rejectWithValue }) => {
  const API_URL_TAG = process.env.REACT_APP_API_URL + "/tag";

  return fetch(API_URL_TAG, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch tags");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: ITagState = {
  tagError: null,
  tagLoading: false,
  tags: undefined,
};

export const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTags.fulfilled, (state, { payload }) => {
      return { ...state, tags: payload, tagLoading: false };
    });
    builder.addCase(fetchTags.pending, (state) => {
      return { ...state, tagError: null, tagLoading: true };
    });
    builder.addCase(fetchTags.rejected, (state, { payload }) => {
      return payload
        ? { ...state, tagError: payload, tagLoading: false }
        : {
            ...state,
            tagError: "unknown error",
            tagLoading: false,
          };
    });
  },
});

export default tagSlice.reducer;
export type TagDispatch = ThunkDispatch<ITagState, void, AnyAction>;
