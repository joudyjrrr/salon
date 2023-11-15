import { useTranslation } from "react-i18next";
import { Card, CardMedia } from "@mui/material";
import Loading from "../../Components/Loading";
import Pagination from "../../Components/Pagination";
import useCountryHook from "./hooks/useCountryHook"
import { useState } from 'react';
import { Box, Stack, Grid } from "@mui/material";
import Title from "../../Components/Title";
import SearchField from "../../Components/SearchField";
import TableHeader from "../../Components/TableHeader";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { CountryQueries } from "../../API/Country/CountryQueries";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddCountry from "./AddCountry";
import DeleteCountry from './DeleteCountry'
const Country = () => {

    const { t } = useTranslation();
    const [PageNumber, setPageNumber] = useState(0)
    const [query, setQuery] = useState<string>("");
    const [id, setId] = useState<string>("");

    const TableHeaderArray = [
        t("table.name"),
        t("table.currency"),
        t("table.countryCode"),
        t("table.handel"),
    ];
    const {
        // data: CpManagementData,
        isFetching,
        refetch,
        isLoading,
      } = CountryQueries.GetAllCountryQuery({
        PageNumber,
        Query: query,
      });
    const {
        allCountries,
        allCountriesIsLoading
    } = useCountryHook( id, PageNumber)

    console.log({ allCountries });
    const matches = useMediaQuery("(max-width:700px)");

    return (
        <>
            {
                allCountriesIsLoading ?
                <Box marginTop="10px" height="100vh">
                <Loading />
                </Box>
                    :
                    <Box
          sx={{
            paddingInline: "40px",
            marginTop: "30px",
            textAlign: "center",
            height: "initial",
          }}
        >
          <AddCountry />
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text="Country" />
            <SearchField onSearch={(value) => setQuery(value)} value={query} />
          </Stack>
          <>
            <Stack marginTop="40px">
              <TableHeader TableHeaderArray={TableHeaderArray}>
                <TableBody>
                  {allCountries?.data.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.name}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.currency}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.countryCode}
                      </TableCell>
                      <TableCell
                    align="center"
                    sx={{display:"flex" , justifyContent:"center"}}
                      >
                        <DeleteCountry refetch={refetch} id={d.id} />
                        <AddCountry
                            id={d.id}
                            setId={() => setId(d.id ?? "")}
                          />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableHeader>
              <Pagination
                page={PageNumber}
                isFetching={isFetching}
                onPageChange={setPageNumber}
                totalPages={allCountries?.totalPages!}
              />
            </Stack>
          </>
        </Box>
                    // <>
                    //     {allCountries?.data.map((country, idx) => {
                    //         console.log(country);

                    //         return (
                    //             <Card key={idx}>
                    //                 <CardMedia
                    //                     component={'img'}
                    //                     alt="Country image"
                    //                     height={150}

                    //                 >

                    //                 </CardMedia>
                    //             </Card>
                    //         )
                    //     })}

                    //     < Pagination
                    //         clickPrev={() => setPageNumber((prev) => prev - 1)}
                    //         disablePrev={PageNumber < 1}
                    //         clickNext={() => setPageNumber((prev) => prev + 1)}
                    //         disableNext={allCountries?.pageNumber === allCountries?.totalPages}

                    //     />
                    // </>


            }
        </>
    )
}

export default Country