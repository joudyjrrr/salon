import { FormControl, InputLabel, Select, Typography, MenuItem } from "@mui/material"
import { FC } from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { AddNotificationType } from "../hooks/type"


const AppType: FC<{
    control: Control<AddNotificationType, any>,
    errors: FieldErrors<AddNotificationType>
}> = ({
    control,
    errors
}) => {

        const { t } = useTranslation();

        return (
            <>
                <FormControl fullWidth sx={{ mt: '10px' }}>
                    <InputLabel id="demo-simple-select-label">{t('Notification.AppType')}</InputLabel>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => {
                            return (
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    {...field}
                                    label={t('Notification.Type')}
                                    sx={{ maxWidth: '250px' }}
                                >
                                    <MenuItem value={0}>{t('Notification.Customer')}</MenuItem>
                                    <MenuItem value={1}>{t('Notification.Store')}</MenuItem>
                                    <MenuItem value={2}>{t('Notification.Driver')}</MenuItem>
                                </Select>
                            )
                        }}
                    />
                </FormControl>
                <Typography color={'error'} variant="subtitle2" sx={{ mt: '10px' }}>{errors.type?.message}</Typography>

            </>
        )
    }

export default AppType