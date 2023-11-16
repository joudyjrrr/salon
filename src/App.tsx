import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "./libs/redux";
import CssBaseline from "@mui/material/CssBaseline";
import getDesignTokens from "./libs/getDesignTokens";
import Routes from "./Routes";
import RTL from "./libs/lang/Rtl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const mode = useSelector((state: RootState) => state.them.mode);
  const lang = useSelector((state: RootState) => state.lang.lang);
  //
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="bottom-right" />
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
