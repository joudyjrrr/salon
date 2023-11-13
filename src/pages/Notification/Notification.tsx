import { Box, Card, Grid, Paper, Typography, CardActions } from '@mui/material'
import React, { useState } from 'react'
import Title from '../../Components/Title'
import SearchField from '../../Components/SearchField'
import useNotificationsHook from './hooks/useNotificationsHook.tsx'
import Pagination from '../../Components/Pagination'
import Loading from '../../Components/Loading'
import DeleteNotification from './DeleteNotification'
import AddNotification from './AddNotification'

const Notification = () => {
    const [Search, setSearch] = useState<string>('');
    const [PageNumber, setPageNumber] = useState(0);

    const {
        Notifications,
        isFetching,
        t
    } = useNotificationsHook(PageNumber, Search)

    return (
        <>
            <Grid container justifyContent={'space-between'} sx={{ mt: 2 }} >
                <Grid container item xs={9}>
                    <Grid item sx={{ mx: 5 }}>
                        <Title text={t('Notification.title')} />
                    </Grid>
                    <SearchField value={Search} onSearch={setSearch} />
                </Grid>
                <Grid container alignContent={'center'} justifyContent={'center'} item xs={3}>
                    <AddNotification />
                </Grid>
            </Grid >
            {
                isFetching ?
                    <Loading />
                    :
                    <>
                        <Grid container spacing={2} sx={{ mt: 1, px: 2 }}>
                            {
                                Notifications?.data.map((notification, idx) => {
                                    return (
                                        <Grid key={idx} item xs={12} sm={6} lg={3}>
                                            <Card sx={{ padding: 3 }}>
                                                {
                                                    notification.title.map((notification, idx) => {
                                                        return (
                                                            <Typography key={idx} variant='body2'>
                                                                {notification.key === 'ar' ? t('Notification.arTitle') : t('Notification.enTitle')} :
                                                                {notification.value ? notification.value : '---'}
                                                            </Typography>
                                                        )
                                                    })
                                                }
                                                {
                                                    notification.body.map((notification, idx) => {
                                                        return (
                                                            <Typography key={idx} variant='body2'>
                                                                {notification.key === 'ar' ? t('Notification.arBody') : t('Notification.enBody')} :
                                                                {notification.value ? notification.value  : '---'}
                                                            </Typography>
                                                        )
                                                    })
                                                }

                                                <Box sx={{ typography: 'caption' }}>
                                                    {t('Notification.createdAt')} : {notification.createdAt}
                                                </Box>
                                                <CardActions>
                                                    <DeleteNotification id={notification.id} />
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        <Pagination
                            isFetching={isFetching}
                            onPageChange={setPageNumber}
                            page={PageNumber}
                            totalPages={Notifications?.totalPages!}
                        />
                    </>
            }
        </>
    )
}

export default Notification