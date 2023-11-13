import { SxProps, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
interface IUploadImg {
  buttonText?: string;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  errorMessage?: string;
  setImg?: () => void;
  sx?:SxProps
  className?:string;
}
const UploadGenericImg = ({
  buttonText,
  onFileUpload,
  disable,
  errorMessage,
  setImg,
  sx,
  className
}: IUploadImg) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null!);

  return (
    <>
      <div className={`w-[60%] relative h-fit ${className} `}>
        <input
          ref={inputRef}
          accept="image/*"
          style={{ opacity: "0"  , position:"absolute"}}
          id="raised-button-files"
          type="file"
          onChange={onFileUpload}
          height={"100%"}
        />
        <label htmlFor="raised-button-files">
          <Button
            disabled={disable}
            sx={{
              "input + button": {
                height: "100%",
              },
              color: "#fff",
              ...sx
            }}
            onClick={() => {
              setImg?.();
              inputRef.current.click();
            }}
            variant="contained"
            color="primary"
            fullWidth
          >
            {buttonText ? buttonText : t("form.upLoadImg")}
          </Button>
        </label>
        <Typography component={"p"} variant={"subtitle1"} color="error">
          {errorMessage}
        </Typography>
      </div>
    </>
  );
};

export default UploadGenericImg;
