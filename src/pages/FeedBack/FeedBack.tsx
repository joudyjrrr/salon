import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FeedbackQueries } from '../../API/Feddback/FeedbackQueries';
import Title from '../../Components/Title';
import SearchField from '../../Components/SearchField';
import Loading from "../../Components/Loading";
import { Box, Card, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import Pagination from '../../Components/Pagination';

function FeedBack() {

    const {t} = useTranslation();
    const [query, setQuery] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const { data: feedBackData, isLoading , isFetching} = FeedbackQueries.FeedBackQuery({
        PageNumber: page,
        Query: query,
    });
console.log(feedBackData?.data)
const matches = useMediaQuery("(max-width:700px)");

  return (
    
    <>
    {isLoading
    ? (
        <Box marginTop="10px" height="100vh">
            <Loading />
        </Box>
    )
    : ( <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
          textAlign: "center",
          height: "initial",
        }}
      >
        <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
        <Title text={t('FeedBack.title')} />
            <SearchField onSearch={setQuery} value={query} />
          </Stack>
        {/* {feedBackData?.data?.map((d, index) => (
        ))
    } */}
    <Grid container spacing={2} sx={{ mt: 3, px: 1 }}>
            {
                feedBackData?.data.map((feed, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={6} lg={3}>
                            <Card sx={{ padding: 2 }}>
                            <Typography key={index} variant='body2'  sx={{ textAlign: 'start' }}>
                            {t("FeedBack.titleCard")} : {feed.title} <br/>
                            {t("FeedBack.userName")} : {feed.userName}    <br/>                                                        
                            {t("FeedBack.description")} : {feed.body}     <br/>                                                       
                            {t("FeedBack.phoneNumber")} : {feed.phoneNumber}    <br/>                                                                                                                    
                            </Typography>
                            </Card>
                        </Grid>
                            )
                                })
                            }
                        </Grid>
                    </Box>
                    )
                    }
                    <Pagination
                            isFetching={isFetching}
                            onPageChange={setPage}
                            page={page}
                            totalPages={feedBackData?.totalPages!}
                        />
    </>
  )
  }
export default FeedBack