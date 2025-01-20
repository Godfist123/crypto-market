import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface coinInfo {
  id: string;
  name: string;
  image: string;
}
const initialState: coinInfo[] = [];

const PinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    addPin: (state, action: PayloadAction<coinInfo>) => {
      state.push(action.payload);
    },
    removePin: (state, action: PayloadAction<string>) => {
      return state.filter((coin) => coin.id !== action.payload);
    },
  },
});

export const { addPin, removePin } = PinSlice.actions;
export default PinSlice.reducer;
