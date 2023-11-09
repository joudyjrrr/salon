import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { themAction } from "./libs/redux/themSlice";
import { RootState } from "./libs/redux";
import CssBaseline from "@mui/material/CssBaseline";
import getDesignTokens from "./libs/getDesignTokens";
import { useTranslation } from "react-i18next";
import Routes from "./Routes";
import RTL from "./libs/lang/Rtl";
const App = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.them.mode);
  const lang = useSelector((state: RootState) => state.lang.lang);
  const toggleColorMode = () => {
    dispatch(themAction.setMode(mode === "dark" ? "light" : "dark"));
  };
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const { t } = useTranslation();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Button onClick={toggleColorMode} color="primary" variant="outlined">
          {t("hi.hi")}
        </Button> */}
        {lang == "ar" ? (
          <RTL>
            <Routes />
          </RTL>
        ) : (
          <Routes />
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
