import { Grid } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import FormTextField from "../Form/FormTextField";
import SelectLocation from "../Form/SelectLocation";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

const Inputs: FC<{
  control: any;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}> = ({ control, setValue, watch }) => {
  const { t } = useTranslation();
  return (
    <>
     
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.name")}
          name="name"
          // req={true}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.description")}
          name="description"
          // req={true}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.phoneNumber")}
          name="phoneNumber"
          // req={true}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.tempPhoneNumber")}
          name="tempPhoneNumber"
          // req={true}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.facebookUrl")}
          name="facebookUrl"
          // req={true}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6}>
        <FormTextField
          control={control}
          label={t("form.instagramUrl")}
          name="instagramUrl"
          // req={true}
        />
      </Grid>
      {!watch("latitude") && !watch("longitude") ? (
        <Grid item lg={3} md={4} sm={6}>
          <SelectLocation setValue={setValue} />
        </Grid>
      ) : (
        <>
          <Grid item lg={3} md={4} sm={6}>
            <FormTextField
              label={t("form.latitude")}
              name="latitude"
              shrink
              control={control}
              type="number"
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6}>
            <FormTextField
              label={t("form.longitude")}
              name="longitude"
              shrink
              control={control}
              type="number"
            />
          </Grid>
        </>
      )}
    </>
  );
};
export default Inputs;
