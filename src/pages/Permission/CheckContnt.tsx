import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Stack,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { IContentPermission, IPermissionGet } from "../../API/Permission/type";
import { Control, UseFormSetValue } from "react-hook-form";

const CheckContnt: FC<{
  content: IContentPermission;
  control: Control<IPermissionGet, any>;
  setValue: UseFormSetValue<IPermissionGet>;
  index: number;
}> = ({ content, control, setValue, index }) => {
  const [openContent, setOpenContent] = useState<boolean>(true);
  //   console.log(content)
  const contentArray = Object.entries(content)
    .filter(([_key, value]) => typeof value === "boolean")
    .map(([key, value]) => [key, value]);
  const [Parent, setParent] = useState<boolean>(true);
  const changeParentHandler = (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      setValue(`contents.${index}.canAdd`, true);
      setValue(`contents.${index}.canEdit`, true);
      setValue(`contents.${index}.canView`, true);
      setValue(`contents.${index}.canDelete`, true);
      setValue(`contents.${index}.canDownload`, true);
    } else {
      setValue(`contents.${index}.canAdd`, false);
      setValue(`contents.${index}.canEdit`, false);
      setValue(`contents.${index}.canView`, false);
      setValue(`contents.${index}.canDelete`, false);
      setValue(`contents.${index}.canDownload`, false);
    }
  };

  console.log(contentArray);
  return (
    <>
      <Stack direction={"row"} alignItems="center">
        <IconButton
          onClick={() => setOpenContent((open) => !open)}
          sx={{ p: 0.3 }}
        >
          {openContent ? <MdExpandLess /> : <MdExpandMore />}
        </IconButton>
        <FormControlLabel
          label={content.name}
          control={<Checkbox checked={Parent} onChange={changeParentHandler} />}
        />
      </Stack>
      <Collapse in={openContent}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginInlineStart: 7,
          }}
        >
          {contentArray.map((d) => (
            <FormControlLabel
              label={d[0]}
              value={``}
              control={<Checkbox defaultChecked />}
            />
          ))}
        </Box>
      </Collapse>
    </>
  );
};
export default CheckContnt;
