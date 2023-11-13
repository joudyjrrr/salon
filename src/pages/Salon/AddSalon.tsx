import { Box, Grid, Stack } from "@mui/material";
import useSalon from "./hook/useSalon";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import Inputs from "../../Components/Salon/Inputs";
import GenericObjectAutoCompleteNubmer from "../../Components/Form/GenericObjectAutoCompleteNubmer";
import { SalonTypeArray } from "../../API/Salon/type";
import { Controller } from "react-hook-form";
import SelectLocation from "../../Components/Form/SelectLocation";

const AddSalon = () => {
  const { control, setValue, watch } = useSalon();
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={t("salon.add")} />
        <form
          style={{
            marginTop: "50px",
          }}
        >
          <Grid
            item
            container
            lg={12}
            md={12}
            sm={12}
            spacing={{ xs: 2, md: 3 }}
          >

            <Inputs control={control} setValue={setValue} watch={watch} />
            <Grid item lg={3} md={4} sm={6}>
              <Controller
                name="SalonType"
                control={control}
                render={({ field }) => (
                  <GenericObjectAutoCompleteNubmer
                    onChange={field.onChange}
                    value={field.value}
                    option={SalonTypeArray}
                    label={t("form.chooseSalonType")}
                    
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};
export default AddSalon;
