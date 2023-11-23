import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import useBanner from "./hook/useBanner";
import FormTextField from "../../Components/Form/FormTextField";
import { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import GenericObjectAutoComplete from "../../Components/Form/GenericObjectAutoComplete";

const AddBanner = () => {
  const { t } = useTranslation();
  const {
    control,
    radioSelect,
    setRadioSelect,
    salonOption,
    serviceOption,
    cityOption,
  } = useBanner();
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={t("Banner.add")} />
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
              <Grid item lg={4} md={4} sm={6}>
                <FormTextField
                  label={t("form.fromDate")}
                  shrink
                  type="datetime-local"
                  name="fromDate"
                  control={control}
                  dataTest={"fromDate"}
                  req={true}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6}>
                <FormTextField
                  label={t("form.toDate")}
                  shrink
                  type="datetime-local"
                  name="toDate"
                  control={control}
                  dataTest={"toDate"}
                  req={true}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <GenericObjectAutoComplete
                      option={cityOption}
                      value={field.value}
                      onChange={field.onChange}
                      label={t("form.chooseCity")}
                      required={true}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <FormControl
              sx={{
                margin: "15px",
              }}
            >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={"link"}
                name="radio-buttons-group"
                row
                value={radioSelect}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setRadioSelect(event.target.value)
                }
              >
                <FormControlLabel
                  value="link"
                  control={<Radio />}
                  label={t("form.link")}
                />
                <FormControlLabel
                  value="salon"
                  control={<Radio />}
                  label={t("links.salon")}
                />
                <FormControlLabel
                  value="service"
                  control={<Radio />}
                  label={t("serv.title")}
                />
              </RadioGroup>
            </FormControl>
            <Box>
              {radioSelect === "link" && (
                <FormTextField
                  shrink
                  label={t("form.link")}
                  name={"link"}
                  control={control}
                  sx={{ width: "50%" }}
                />
              )}
              {radioSelect === "salon" && (
                <Controller
                  name="salon"
                  control={control}
                  render={({ field }) => (
                    <GenericObjectAutoComplete
                      option={salonOption}
                      value={field.value}
                      onChange={field.onChange}
                      label={t("form.chooseSalaon")}
                      required={true}
                      sx={{ width: "50%" }}
                    />
                  )}
                />
              )}
              {radioSelect === "service" && (
                <Stack flexDirection={`row`} gap={`20px`}>
                  <Controller
                    name="salon"
                    control={control}
                    render={({ field }) => (
                      <GenericObjectAutoComplete
                        option={salonOption}
                        value={field.value}
                        onChange={field.onChange}
                        label={t("form.chooseSalaon")}
                        required={true}
                        sx={{ width: "100%" }}
                      />
                    )}
                  />
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <GenericObjectAutoComplete
                        option={serviceOption}
                        value={field.value}
                        onChange={field.onChange}
                        label={t("form.chooseService")}
                        required={true}
                        sx={{ width: "100%" }}
                        disabled={typeof serviceOption === "undefined"}
                      />
                    )}
                  />
                </Stack>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};
export default AddBanner;
