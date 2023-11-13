import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import Loading from "../../../Components/Loading";
import { INameAndId, IPagination } from "../../../interface/generic";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FC } from "react";
import { AddNotificationType } from "../hooks/type";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getCityAllType } from "../../../API/City/type";



const CountryCity: FC<{
    register: UseFormRegister<AddNotificationType>,
    errors: FieldErrors<AddNotificationType>,
    setValue: UseFormSetValue<AddNotificationType>,
    watch: UseFormWatch<AddNotificationType>,
    isCountryLoading: boolean,
    countries: {
        id: string;
        name: string;
    }[] | undefined,
    isCitiesLoading: boolean,
    cities: IPagination<getCityAllType> | undefined
}> = ({
    register,
    errors,
    setValue,
    watch,
    isCountryLoading,
    countries,
    isCitiesLoading,
    cities
}) => {

        const { t } = useTranslation()

        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Autocomplete
                            id='CountrySelect'
                            {...register('country')}
                            fullWidth
                            popupIcon={isCountryLoading ? <Loading size={25} /> : <ArrowDropDownIcon />}
                            onChange={(_, newValue) => setValue('country', newValue)}
                            renderOption={(prop, country) => (
                                <li {...prop} key={country.id}>
                                    {country.name ?? 'No Name'}
                                </li>
                            )}
                            getOptionLabel={(option: INameAndId) => option.name ?? 'No Name'}
                            options={countries ?? []}
                            renderInput={((params) => (
                                <TextField
                                    {...params}
                                    label={t('Notification.country')}
                                    placeholder={t('Notification.country')}
                                    fullWidth
                                />
                            ))}
                        />
                    </Grid>
                    <Grid item xs={6}>

                        <Autocomplete
                            id='CitySelect'
                            {...register('city')}
                            fullWidth
                            popupIcon={isCitiesLoading ? <Loading size={25} /> : <ArrowDropDownIcon />}
                            onChange={(_, newValue) => setValue('city', newValue)}
                            renderOption={(prop, customer) => (
                                <li {...prop} key={customer.id}>
                                    {customer.name ?? 'No Name'}
                                </li>
                            )}
                            disabled={!watch('country')}
                            getOptionLabel={(option: INameAndId) => option.name ?? 'No Name'}
                            options={cities?.data ?? []}
                            renderInput={((params) => (
                                <TextField
                                    {...params}
                                    label={t('Notification.cities')}
                                    placeholder={t('Notification.cities')}
                                    fullWidth
                                />
                            ))}
                        />
                    </Grid>
                </Grid>

                <Typography color={'error'} variant="subtitle2" sx={{ mt: '10px' }}>{errors.city?.name?.message}</Typography>
            </>
        )
    }

export default CountryCity