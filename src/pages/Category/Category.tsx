import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Loading from "../../Components/Loading";
import Pagination from "../../Components/Pagination";
import useCategoryHook from "./hooks/useCategoryHook";
import { useState } from "react";
import { API_BASE_URL } from "../../API/domain";
import DeleteCategory from "./DeleteCategory";
import SearchField from "../../Components/SearchField";
import Title from "../../Components/Title";

const Category = () => {


    const [PageNumber, setPageNumber] = useState(0)
    const [Search, setSearch] = useState<string>()



    const {
        allCategories,
        allCategoriesIsLoading,
        t
    } = useCategoryHook(PageNumber, Search)

    console.log(allCategories);



    return (
        <>
            <Grid container sx={{ mt: 2 }} >
                <Grid item sx={{ mx: 5 }}>
                    <Title />
                </Grid>
                <SearchField value={Search} onSearch={setSearch} />
            </Grid >
            {
                allCategoriesIsLoading ?
                    <Loading />
                    :
                    <>
                        <Grid container spacing={4} sx={{ px: 2, mt: 3 }}>

                            {allCategories?.data.map((category, idx) => {

                                return (
                                    <Grid key={idx} item xs={12} sm={6} lg={3}>
                                        <Card>
                                            <CardMedia
                                                component={'img'}
                                                alt="Category image"
                                                height={150}
                                                image={`${API_BASE_URL}${category.imageUrl}`}
                                            />
                                            <CardContent>
                                                <Grid container flexDirection={'column'}>
                                                    {category.name.map((name, idx) => {
                                                        return (
                                                            <Typography key={idx} variant="caption">
                                                                {name.key === 'ar' ? t("form.arName") : t("form.enName")} {name.value}
                                                            </Typography>
                                                        )
                                                    })}
                                                    <Typography variant="caption">
                                                        {t('Category.type')} : {category.type}
                                                    </Typography>
                                                </Grid>
                                            </CardContent>
                                            <CardActions>
                                                <DeleteCategory id={category.id} />
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })}

                            < Pagination
                                // clickPrev={() => setPageNumber((prev) => prev - 1)}
                                // disablePrev={PageNumber < 1}
                                // clickNext={() => setPageNumber((prev) => prev + 1)}
                                // disableNext={(Number(allCategories?.pageNumber) + 1) === allCategories?.totalPages}
                                page={PageNumber}
                                onPageChange={setPageNumber}
                                isFetching={allCategoriesIsLoading}
                                totalPages={allCategories?.totalPages!}
                                isPreviousData={false}
                            />
                        </Grid>
                    </>


            }
        </>
    );
};

export default Category;
