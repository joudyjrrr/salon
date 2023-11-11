import { Typography } from "@mui/material";

const Title = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          width: "fit-content",
          borderBottom: "2px solid #6870fa",
          marginTop:"10px",
          height:"40px"
        }}
      >
        Usere
      </Typography>
    </>
  );
};
export default Title;
