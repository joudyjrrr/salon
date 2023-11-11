import { FC } from 'react'
import { Button, Grid, } from "@mui/material"
import { useTranslation } from 'react-i18next'

const Pagination: FC<{
    clickPrev: () => void,
    clickNext: () => void,
    disablePrev: boolean,
    disableNext: boolean
}> = (props) => {

    const { t } = useTranslation();


    return (
        <>
            <Grid container spacing={4} justifyContent={'end'} sx={{ mt: '20px' }}>
                <Button
                    sx={{ mx: '10px' }}
                    variant='outlined'
                    onClick={props.clickPrev}
                    disabled={props.disablePrev}
                >
                    {t('btns.prev')}
                </Button>
                <Button
                    sx={{ mx: '10px' }}
                    variant='outlined'
                    onClick={props.clickNext}
                    disabled={props.disableNext}
                >
                    {t('btns.next')}
                </Button>
            </Grid>
        </>
    )
}

export default Pagination