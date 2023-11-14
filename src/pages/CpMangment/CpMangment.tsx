import { useTranslation } from "react-i18next";
import { Box, Stack, Grid } from "@mui/material";
import TableHeader from "../../Components/TableHeader";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CpManagementQueries } from "../../API/CpManagement/CpManagementQueries";
import { useState } from "react";
import Pagination from "../../Components/Pagination";
import Loading from "../../Components/Loading";
import Title from "../../Components/Title";
import SearchField from "../../Components/SearchField";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
const CpMangment = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [id, setId] = useState<string>("");
  const TableHeaderArray = [
    t("table.name"),
    t("table.role"),
    t("table.handel"),
  ];
  const {
    data: CpManagementData,
    isFetching,
    refetch,
    isLoading,
  } = CpManagementQueries.GetUsersQuery({
    PageNumber: page,
    Query: query,
  });
  const matches = useMediaQuery("(max-width:700px)");
  console.log(matches);
  return (
    <>
      {isLoading ? (
        <Box marginTop="10px" height="100vh">
          <Loading />
        </Box>
      ) : (
        <Box
          sx={{
            paddingInline: "40px",
            marginTop: "30px",
            textAlign: "center",
            height: "initial",
          }}
        >
          <AddUser />
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text="Users" />
            <SearchField onSearch={(value) => setQuery(value)} value={query} />
          </Stack>
          <>
            <Stack marginTop="40px">
              <TableHeader TableHeaderArray={TableHeaderArray}>
                <TableBody>
                  {CpManagementData?.data.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.username}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.role}
                      </TableCell>
                      <TableCell
                    align="center"
                    sx={{display:"flex" , justifyContent:"center"}}
                      >
                        <DeleteUser refetch={refetch} id={d.id} />
                        <AddUser
                            id={d.id}
                            setId={() => setId(d.id ?? "")}
                          />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableHeader>
              <Pagination
                page={page}
                isFetching={isFetching}
                onPageChange={setPage}
                totalPages={CpManagementData?.totalPages!}
              />
            </Stack>
          </>
        </Box>
      )}
    </>
  );
};
export default CpMangment;
