import { Grid, TextField, Typography } from "@mui/material"
import { FC } from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { AddNotificationType } from "../hooks/type"
import { useTranslation } from "react-i18next"

const TitleAndBody: FC<{
    register: UseFormRegister<AddNotificationType>
    errors: FieldErrors<AddNotificationType>

}> = ({
    register,
    errors
}) => {
        const { t } = useTranslation()

        return (
            <>
                <Typography variant="h6" sx={{ mb: '10px' }}>{t('Notification.Title')}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...register('title.0.value')}
                            fullWidth
                            id="outlined-basic"
                            label={t('Notification.arTitle')}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...register('title.1.value')}
                            fullWidth id="outlined-basic"
                            label={t('Notification.enTitle')}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle2" color={'error'}>{errors.title?.[0]?.value?.message}</Typography>

                <Typography variant="h6" sx={{ mb: '10px' }}>{t('Notification.Body')}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            {...register('body.0.value')}
                            id="outlined-basic"
                            multiline
                            rows={4}
                            label={t('Notification.arBody')}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            {...register('body.1.value')}
                            id="outlined-basic"
                            multiline
                            rows={4}
                            label={t('Notification.enBody')}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Typography variant="subtitle2" color={'error'}>{errors.body?.[0]?.value?.message}</Typography>
            </>
        )
    }

export default TitleAndBody