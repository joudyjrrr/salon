import React from "react";
import { ThemeProvider, createTheme  , } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { themAction } from "./libs/redux/themSlice";
import { RootState } from "./libs/redux";
import CssBaseline from '@mui/material/CssBaseline';
import getDesignTokens from "./libs/getDesignTokens";
import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation();
  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Button onClick={toggleColorMode} color="primary" variant="outlined">
         {t("hi.hi")}
        </Button>
     
      </ThemeProvider>
    </>
  );
};

export default App;
