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
import { useNavigate } from "react-router";
import { BannerQuery } from "../../API/Banner/BannerQueries";
import Loading from "../../Components/Loading";
import Title from "../../Components/Title";
import SearchField from "../../Components/SearchField";
import AddIcon from "@mui/icons-material/Add";
import { API_SERVER_URL_For_Img } from "../../API/domain";
import img from "../../assets/1.jpg";
import moment from "moment";
const Banner = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [id, setId] = useState<string>("");
  const matches = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const { data: bannerData, isLoading } = BannerQuery.GetAllBannerQuery({
    PageNumber: page,
    Query: query,
  });
  return (
    <>
      {isLoading ? (
        <Box marginTop="150px">
          <Loading />
        </Box>
      ) : (
        <>
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
                onClick={() => navigate("add-banner")}
              >
                <AddIcon className="text-white-100" />
              </Fab>
            </Stack>
            <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
              <Title text={t("Banner.title")} />
              <SearchField
                onSearch={(value) => setQuery(value)}
                value={query}
              />
            </Stack>
            <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>
              {bannerData?.data.map((d, index) => (
                <Grid key={index} item xs={12} sm={6} lg={3}>
                  <Card elevation={7}>
                    <CardMedia
                      component={"img"}
                      height={150}
                      image={
                        d.imageURl
                          ? `${API_SERVER_URL_For_Img}/${d.imageURl}`
                          : img
                      }
                    />
                    <CardContent>
                      <Grid container flexDirection={"column"}>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("form.fromDate")} :
                          </Typography>
                          <Typography variant="caption">
                            {moment(d.fromDate).format("MMM Do YY")}
                          </Typography>
                        </Stack>
                        <Stack flexDirection="row" gap="5px">
                          <Typography variant="caption">
                            {t("form.toDate")} :
                          </Typography>
                          <Typography variant="caption">
                            {moment(d?.fromDate).format("MMM Do YY")}
                          </Typography>
                        </Stack>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};
export default Banner;
