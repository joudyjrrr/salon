import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Stack, TextField } from "@mui/material";
import useCpMngment from "./hook/useCpMngment";
import FormTextField from "../../Components/Form/FormTextField";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddUser() {
  const {control} = useCpMngment()
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        onClose={handleClose}
        fullWidth
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <Stack flexDirection="column" spacing={5} padding="15px">
            <FormTextField 
            control={control}
            name="username"
            label={t("form.userName")}
            />
          <FormTextField 
            control={control}
            name="password"
            label={t("form.password")}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
