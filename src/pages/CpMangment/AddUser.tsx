import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";
import useCpMngment from "./hook/useCpMngment";
import FormTextField from "../../Components/Form/FormTextField";
import GenericObjectAutoComplete from "../../Components/Form/GenericObjectAutoComplete";
import FormPasswordInput from "../../Components/Form/FormPasswordInput";
import SubmitButton from "../../Components/Form/SubmitButton";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddUser() {
  const {
    control,
    handleSubmit,
    onSubmit,
    roleOption,
    register,
    setValue,
    open,
    setOpen,
    isPending,
    isSuccess,
  } = useCpMngment();
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <React.Fragment>
      <Stack flexDirection="row" justifyContent="end" marginInline="50px">
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon className="text-white-100" />
        </Fab>
      </Stack>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        fullWidth
        aria-describedby="alert-dialog-slide-description"
        sx={{ textAlign: "center" }}
      >
        <DialogTitle>Add User</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack flexDirection="column" spacing={5} padding="15px">
              <FormTextField
                control={control}
                name="username"
                label={t("form.userName")}
                req
              />
              <FormPasswordInput register={register} req />
              <GenericObjectAutoComplete
                option={roleOption!}
                {...register("roles")}
                label="Select Roles"
                onChange={(newValue) => setValue("roles", newValue!)}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <SubmitButton isSubmitting={isPending} />
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
