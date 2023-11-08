import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme  , } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { themAction } from "./libs/redux/themSlice";
import { RootState } from "./libs/redux";

import { PaletteMode } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";
import CssBaseline from '@mui/material/CssBaseline';
import getDesignTokens from "./libs/getDesignTokens";
const App = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.them);
  const toggleColorMode = () => {
    dispatch(themAction.setMode(mode.mode === 'dark' ? 'light' : "dark"));
  };
  const theme = React.useMemo(
    () => createTheme(getDesignTokens(mode.mode)),
    [mode]
  );
  console.log(theme.palette.mode)
  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Button onClick={toggleColorMode} color="primary" variant="outlined">
          {" "}
          hi
        </Button>
        hiiiiiiiiiiiiiiiiiiiii
      </ThemeProvider>
    </>
  );
};

export default App;
