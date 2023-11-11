import { Card, CardMedia } from "@mui/material";
import Loading from "../../Components/Loading";
import Pagination from "../../Components/Pagination";
import useCategoryHook from "./hooks/useCategoryHook"
import { useState } from 'react';

const Category = () => {

    const [PageNumber, setPageNumber] = useState(0)

    const {
        allCategories,
        allCategoriesIsLoading
    } = useCategoryHook(PageNumber)

    console.log({ allCategories });

    return (
        <>
            {
                allCategoriesIsLoading ?
                    <Loading />
                    :
                    <>
                        {allCategories?.data.map((category, idx) => {
                            console.log(category);

                            return (
                                <Card key={idx}>
                                    <CardMedia
                                        component={'img'}
                                        alt="Category image"
                                        height={150}

                                    >

                                    </CardMedia>
                                </Card>
                            )
                        })}

                        < Pagination
                            clickPrev={() => setPageNumber((prev) => prev - 1)}
                            disablePrev={PageNumber < 1}
                            clickNext={() => setPageNumber((prev) => prev + 1)}
                            disableNext={allCategories?.pageNumber === allCategories?.totalPages}

                        />
                    </>


            }
        </>
    )
}

export default Category