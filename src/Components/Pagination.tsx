import { Box, IconButton } from "@mui/material";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleFill } from "react-icons/ri";
import { FC } from "react";
type IProps = {
  page: number;
  isFetching: boolean;
  totalPages: number;
  isPreviousData: boolean;
  onPageChange: (arg: number) => void;
};
const Pagination: FC<IProps> = ({
  onPageChange,
  page,
  isFetching,
  totalPages,
}) => {
  return (
    <>
      <Box display="flex">
        <IconButton
          color="primary"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          <RiArrowLeftDoubleLine />
        </IconButton>
        <IconButton
          disabled={isFetching || page === totalPages - 1}
          color="primary"
          onClick={() => onPageChange(page + 1)}
        >
          <RiArrowRightDoubleFill />
        </IconButton>
      </Box>
    </>
  );
};
export default Pagination;
