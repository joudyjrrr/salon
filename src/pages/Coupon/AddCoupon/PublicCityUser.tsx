import { Autocomplete, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Loading from "../../../Components/Loading";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CouponHook from "../hook/CouponHook";
import { INameAndId } from "../../../interface/generic";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AddCouponType } from "../hook/type";


const PublicCityUser: FC<{
    CityUser: string,
    setCityUser: Dispatch<SetStateAction<string>>,
    register: UseFormRegister<AddCouponType>,
    setValue: UseFormSetValue<AddCouponType>,
    errors: FieldErrors<AddCouponType>
}> = ({ CityUser, setCityUser, register, setValue, errors }) => {

    const { t, customerLoading, Customers, countries, cities } = CouponHook()

    return (
        <>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={'Public'}
                    name="radio-buttons-group"
                    row
                    value={CityUser}
                    onChange={
                        (event: ChangeEvent<HTMLInputElement>) => setCityUser(event.target.value)
                    }
                >
                    <FormControlLabel value="Public" control={<Radio />} label={t("Coupon.Public")} />
                    <FormControlLabel value="ByCity" control={<Radio />} label={t("Coupon.ByCity")} />
                    <FormControlLabel value="ByUser" control={<Radio />} label={t("Coupon.ByUser")} />
                </RadioGroup>
            </FormControl>
            <Grid container >
                {CityUser === 'ByUser' &&
                    <Grid xs={12}>
                        <Autocomplete
                            multiple
                            blurOnSelect={false}
                            clearOnEscape={false}
                            disableCloseOnSelect
                            filterSelectedOptions
                            getOptionLabel={(option) => `${option.userName} - ${option.phoneNumber}`}
                            filterOptions={(options, { inputValue }) => {
                                return options.filter((option) =>
                                    option.phoneNumber.toString().includes(inputValue) || option.userName.includes(inputValue)
                                );
                            }}
                            popupIcon={customerLoading ? <Loading size={25} /> : <ArrowDropDownIcon />}
                            id='UserSelect'
                            {...register('customers')}
                            fullWidth
                            onChange={(_, newValue) => setValue('customers', newValue)}

                            renderOption={(prop, customer) => (
                                <li {...prop} key={customer.userId}>
                                    <Grid container justifyContent={'space-between'}>
                                        <Typography>
                                            {customer.userName ?? 'No Name'}
                                        </Typography>
                                        <Typography>
                                            {customer.phoneNumber ?? 'No Number'}
                                        </Typography>
                                    </Grid>
                                </li>
                            )}

                            options={Customers?.filter((customer) => customer.userName !== null) ?? []}

                            renderInput={((params) => (
                                <TextField
                                    {...params}
                                    label={t("Coupon.Users")}
                                    placeholder='users'
                                    fullWidth
                                    error={!!errors.customers?.message}
                                    helperText={errors.customers?.message}
                                />
                            ))}
                        />

                    </Grid>
                }

                {CityUser === 'ByCity' &&
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                id='CountrySelect'
                                {...register('country')}
                                fullWidth
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
                                        label={t("Coupon.Countries")}
                                        placeholder={t("Coupon.Countries")}
                                        fullWidth
                                        required={CityUser === 'ByCity'}

                                    />
                                ))}
                            />

                        </Grid>
                        <Grid item xs={6}>

                            <Autocomplete
                                id='CitySelect'
                                {...register('city')}
                                fullWidth
                                onChange={(_, newValue) => setValue('city', newValue)}
                                renderOption={(prop, customer) => (
                                    <li {...prop} key={customer.id}>
                                        {customer.name ?? 'No Name'}
                                    </li>
                                )}

                                getOptionLabel={(option: INameAndId) => option.name ?? 'No Name'}
                                options={cities?.data ?? []}
                                renderInput={((params) => (
                                    <TextField
                                        {...params}
                                        label={t("Coupon.Cities")}
                                        placeholder={t("Coupon.Cities")}
                                        fullWidth
                                        required={CityUser === 'ByCity'}

                                    />
                                ))}
                            />
                        </Grid>
                    </Grid>
                }
            </Grid>
        </>
    )
}

export default PublicCityUser