import { createSlice } from "@reduxjs/toolkit";
import {PaletteMode} from "@mui/material"
// type InitalMode ={
//     mode : PaletteMode
// }
const InitialValues  = {
  mode: 'dark' as PaletteMode,
};

const themSlice = createSlice({
  name: "them",
  initialState: InitialValues,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export default themSlice;
export const themAction = themSlice.actions;
