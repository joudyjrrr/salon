import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Controller, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
interface IFormPsswordInputProps {
  multiline?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  shrink?: boolean;
  register: UseFormRegister<any>;
  req: boolean;
  [key: string]: any;
}

const FormPasswordInput = ({
  register,
  req,
  multiline = false,
  disabled = false,
  shrink,
  ...props
}: IFormPsswordInputProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl sx={{ m: 1 }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        {...register("password")}
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
};

export default FormPasswordInput;
