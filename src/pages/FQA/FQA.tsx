import { Button, Grid } from "@mui/material"
import Title from "../../Components/Title"
import FQAHook from "./hook/FQAHook"
import SearchField from "../../Components/SearchField"
import { Link } from "react-router-dom"


const FQA = () => {

    const { t } = FQAHook()

    return (
        <>
            <Grid container justifyContent={'space-between'} sx={{ mt: 2 }} >
                <Grid container item xs={9}>
                    <Grid item sx={{ mx: 5 }}>
                        <Title text={t('Notification.title')} />
                    </Grid>
                    {/* <SearchField value={Search} onSearch={setSearch} /> */}
                </Grid>
                <Grid container alignContent={'center'} justifyContent={'center'} item xs={3}>
                    <Link to={'addNotification'}>
                        <Button variant='contained'>
                            {t('Notification.Add')}
                        </Button>
                    </Link>
                </Grid>
            </Grid >
        </>
    )
}

export default FQA