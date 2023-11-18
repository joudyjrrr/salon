import { Box, Grid, Paper } from "@mui/material";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import useService from "./hook/useService";
import Inputs from "../../Components/Service/Inpts";

const AddService = () => {
  const { t } = useTranslation();
  const {control} = useService()
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={t("serv.add")} />
        <Paper elevation={8} sx={{ paddingX: "20px", paddingBottom: "10px" }}>
          <form
            style={{
              marginTop: "50px",
            }}
            //   onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              item
              container
              lg={12}
              md={12}
              sm={12}
              spacing={{ xs: 2, md: 3 }}
            >
          <Inputs control={control}/>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};
export default AddService;
