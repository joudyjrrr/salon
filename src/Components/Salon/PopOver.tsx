import React from "react";
import { Popover, Typography } from "@mui/material";

const PopOver = () => {
  const [anchorEMployee, setAnchorElmpyee] = React.useState<HTMLElement | null>(
    null
  );
  const openEmployee = Boolean(anchorEMployee);

  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: "none",
      }}
      open={openEmployee}
      anchorEl={anchorEMployee}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={() => setAnchorElmpyee(null)}
      disableRestoreFocus
    >
      <Typography sx={{ p: 1, fontWeight: "bold" }}>Employee</Typography>
    </Popover>
  );
};

export default PopOver;
