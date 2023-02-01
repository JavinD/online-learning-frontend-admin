import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { ICartItem } from "../../../interfaces";

export interface ICartState {
  cart: ICartItem[] | undefined;
  cartError: string | null;
  cartLoading: boolean;
}

export const fetchCart = createAsyncThunk<
  ICartItem[],
  string,
  { rejectValue: string }
>("FETCH_CART", (token, { rejectWithValue }) => {
  const API_URL_CART = process.env.REACT_APP_API_URL_AUTH_USER + "/cart";

  return fetch(API_URL_CART, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch cart");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: ICartState = {
  cartError: null,
  cartLoading: false,
  cart: undefined,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      return { ...state, cart: payload, cartLoading: false };
    });
    builder.addCase(fetchCart.pending, (state) => {
      return { ...state, cartError: null, cartLoading: true };
    });
    builder.addCase(fetchCart.rejected, (state, { payload }) => {
      return payload
        ? { ...state, cartError: payload, cartLoading: false }
        : {
            ...state,
            tagError: "unknown error",
            tagLoading: false,
          };
    });
  },
});

export default cartSlice.reducer;
export type CartDispatch = ThunkDispatch<ICartState, void, AnyAction>;
