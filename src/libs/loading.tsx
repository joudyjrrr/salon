import PuffLoader from "react-spinners/PuffLoader";
import { Box } from "@mui/material";
interface ILoading {
  loadingSize?: number;
  className?: string;
  color?: string;
}

const Loading = ({ loadingSize, className, color }: ILoading) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginInline: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PuffLoader color={color || "#00c3dd"} size={120}/>
      </Box>
    </>
  );
};
export default Loading;
