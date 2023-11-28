import { Box, Collapse, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router";
import { PermissionQueries } from "../../API/Permission/PermissionQueries";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import CheckContnt from "./ChecKContnt";
import { IPermissionGet } from "../../API/Permission/type";
import { useForm } from "react-hook-form";

const EditRole = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { roleId } = useParams();
  const { register, control, watch, handleSubmit, setValue, getValues } =
    useForm<IPermissionGet>();
  const { data: roleDetails, isLoading } =
    PermissionQueries.GetContentsByRoleIdQuery(roleId!);
  console.log(roleDetails);
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={t("permission.edit")} />
        <Paper sx={{ py: 1, px: 4, mt: 5 }} elevation={5}>
          <form>
            <Grid container sx={{ marginInlineStart: 3 }}>
              {roleDetails?.contents.map((d , index) => (
                <Grid item key={d.id} xs={12} md={6} lg={4} xl={3}>
                  <CheckContnt 
                  content={d} 
                  control={control}
                  setValue ={setValue}
                  index = {index}
                   />
                </Grid>
              ))}
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};
export default EditRole;
