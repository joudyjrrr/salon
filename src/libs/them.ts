import { PaletteMode } from "@mui/material";


const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: "#2ca5e0",
            }
            : {
                // palette values for dark mode
                primary: "#2ca5e0",
            }),
    },
});

export default getDesignTokens