import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import TableHeader from "../../Components/TableHeader";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CpManagementQueries } from "../../API/CpManagement/CpManagementQueries";
const CpMangment = () => {
    const { t } = useTranslation();
    const TableHeaderArray = [
      t("table.name"),
      t("table.role"),
      t("table.handel"),
    ];
    const {data} = CpManagementQueries.GetUsersQuery({})
    console.log(data?.pages)
  return (
    <>
    <Box sx={{
        marginInline:"40px",
        marginTop:"30px"
    }}>
      <TableHeader TableHeaderArray={TableHeaderArray}>
      <TableBody>
       <TableRow>
       <TableCell align="center">hi</TableCell>
       <TableCell align="center">hi</TableCell>
       <TableCell align="center">hi</TableCell>
       </TableRow>
      </TableBody>
      </TableHeader>
    </Box>
    </>
  )
};
export default CpMangment;
