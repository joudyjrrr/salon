// import { FC } from 'react'
// import { Button, Grid, } from "@mui/material"
// import { useTranslation } from 'react-i18next'

// const Pagination: FC<{
//     clickPrev: () => void,
//     clickNext: () => void,
//     disablePrev: boolean,
//     disableNext: boolean
// }> = (props) => {

//     const { t } = useTranslation();


//     return (
//         <>
//             <Grid container spacing={4} justifyContent={'end'} sx={{ mt: '20px' }}>
//                 <Button
//                     sx={{ mx: '10px' }}
//                     variant='outlined'
//                     onClick={props.clickPrev}
//                     disabled={props.disablePrev}
//                 >
//                     {t('btns.prev')}
//                 </Button>
//                 <Button
//                     sx={{ mx: '10px' }}
//                     variant='outlined'
//                     onClick={props.clickNext}
//                     disabled={props.disableNext}
//                 >
//                     {t('btns.next')}
//                 </Button>
//             </Grid>
//         </>
//     )
// }

// export default Pagination
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
