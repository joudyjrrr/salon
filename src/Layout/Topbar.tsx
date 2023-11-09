import { Box, IconButton, MenuItem, useTheme } from "@mui/material";
import {  useEffect } from "react";
import { tokens } from "../libs/them"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../libs/redux";
import { themAction } from "../libs/redux/themSlice";
import { Select, SelectChangeEvent } from "@mui/material";
import { langActions } from "../libs/redux/langSlice";
import { useTranslation } from "react-i18next";
// import cookies from "js-cookie";
const languages = [
  {
    code: "en",
    name: "English",
    dir: "ltr",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
  },
];
const Topbar = () => {
  const theme = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const currentLanguageCode = localStorage.getItem("lang") ?? "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const mode = useSelector((state: RootState) => state.them.mode);
  const toggleColorMode = () => {
    dispatch(themAction.setMode(mode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.dir = currentLanguage?.dir || "rtl";
  }, [currentLanguage, t, currentLanguageCode]);

  // console.log(currentLanguageCode);
  const handleChangeLanguage = (e: SelectChangeEvent) => {
    dispatch(langActions.setLang(e.target.value));
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
    document.documentElement.lang = e.target.value;
    localStorage.setItem("lang", e.target.value);
    switch (e.target.value) {
      case "ar":
        document.dir = "rtl";
        break;
      default:
        document.dir = "ltr";
    }
  };

  //
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="end"
      p={2}
      sx={{ background: "#6870fa" }}
    >
      {/* SEARCH BAR */}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <Select value={lang!} onChange={handleChangeLanguage} size="small">
          {languages.map(({ code, name }) => (
            <MenuItem value={code}>{name}</MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default Topbar;
