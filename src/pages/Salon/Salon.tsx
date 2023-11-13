import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Title from "../../Components/Title";
import SearchField from "../../Components/SearchField";
import { SalonQueries } from "../../API/Salon/SalonQueries";
import { API_BASE_URL } from "../../API/domain";
import { SalonTypeArray } from "../../API/Salon/type";
import img from "../../assets/1.jpg";
import Loading from "../../Components/Loading";
import Pagination from "../../Components/Pagination";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
const Salon = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const matches = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const {
    data: salonData,
    isLoading,
    isFetching,
  } = SalonQueries.GetSalonAllQuery({
    Query: query,
    PageNumber: page,
  });
  return (
    <>
      {isLoading ? (
        <Box marginTop="150px">
          <Loading />
        </Box>
      ) : (
        <Box
          sx={{
            paddingInline: "40px",
            marginTop: "30px",
            textAlign: "center",
          }}
        >
          <Stack flexDirection="row" justifyContent="end" marginInline="50px">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => navigate("add-salon")}
            >
              <AddIcon className="text-white-100" />
            </Fab>
          </Stack>
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text="Salon" />
            <SearchField onSearch={(value) => setQuery(value)} value={query} />
          </Stack>
          <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>
            {salonData?.data.map((d, index) => (
              <Grid key={index} item xs={12} sm={6} lg={3}>
                <Card elevation={7}>
                  <CardMedia
                    component={"img"}
                    alt="Category image"
                    height={150}
                    image={d.logo ? `${API_BASE_URL}/${d.logo}` : img}
                  />
                  <CardContent>
                    <Grid container flexDirection={"column"}>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="caption">
                          {t("form.name")} :
                        </Typography>
                        <Typography variant="caption">{d.name}</Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="caption">
                          {t("form.description")} :
                        </Typography>
                        <Typography variant="caption">
                          {d.description}
                        </Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="caption">
                          {t("form.rate")}:
                        </Typography>
                        <Typography variant="caption">{d.rate}</Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="5px">
                        <Typography variant="caption">
                          {t("salon.salonType")}:
                        </Typography>
                        <Typography variant="caption">
                          {
                            SalonTypeArray.find(
                              (type) => type.id === d.salonType
                            )?.Gender
                          }
                        </Typography>
                      </Stack>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            page={page}
            isFetching={isFetching}
            onPageChange={setPage}
            totalPages={salonData?.totalPages!}
          />
        </Box>
      )}
    </>
  );
};
export default Salon;
