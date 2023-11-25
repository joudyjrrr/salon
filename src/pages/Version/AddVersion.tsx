import { Box, Grid, Paper } from "@mui/material";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import FormTextField from "../../Components/Form/FormTextField";
import useVersion from "./hook/useVersion";

const AddVersion = () => {
  const { t } = useTranslation();
  const {control} = useVersion()
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={t("Version.add")} />
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
              <Grid item lg={3} md={4} sm={6}>
                <FormTextField
                  control={control}
                  label={t("form.title")}
                  name="title"
                  req={true}
                  shrink
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};
export default AddVersion;
