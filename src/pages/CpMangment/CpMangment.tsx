import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import TableHeader from "../../Components/TableHeader";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CpManagementQueries } from "../../API/CpManagement/CpManagementQueries";
import { useState } from "react";
import Pagination from "../../Components/Pagination";
import Loading from "../../Components/Loading";
const CpMangment = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const TableHeaderArray = [
    t("table.name"),
    t("table.role"),
    t("table.handel"),
  ];
  const { data: CpManagementData , isFetching  , isPlaceholderData , isLoading} = CpManagementQueries.GetUsersQuery({
    PageNumber: page,
  });
  console.log(CpManagementData);
  console.log(page);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Box
        sx={{
          marginInline: "40px",
          marginTop: "30px",
        }}
      >
        {isLoading || isFetching ?
       <Box marginTop="150px">
         <Loading />
        </Box>
        :
         <>
         <TableHeader TableHeaderArray={TableHeaderArray}>
          <TableBody>
            {CpManagementData?.data.map((d) => (
              <TableRow key={d.id}>
                <TableCell align="center">{d.username}</TableCell>
                <TableCell align="center">{d.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableHeader>
      <Pagination 
      isPreviousData={isPlaceholderData}
      page={page}
      isFetching={isFetching}
      onPageChange={setPage}
      totalPages={CpManagementData?.totalPages!}
      />
         </>}
      </Box>
    </>
  );
};
export default CpMangment;
