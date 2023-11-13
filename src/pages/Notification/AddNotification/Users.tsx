import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { FC } from "react";
import Loading from "../../../Components/Loading";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AddNotificationType } from "../hooks/type";
import { GetCustomersNamesCpType } from "../../../API/CpManagement/type";
import { useTranslation } from "react-i18next";

const Users: FC<{
    register: UseFormRegister<AddNotificationType>,
    errors: FieldErrors<AddNotificationType>,
    setValue: UseFormSetValue<AddNotificationType>,
    watch: UseFormWatch<AddNotificationType>,
    customerLoading: boolean,
    Customers: GetCustomersNamesCpType[] | undefined

}> = ({
    register,
    errors,
    setValue,
    watch,
    customerLoading,
    Customers
}) => {

        const { t } = useTranslation()
        return (
            <>
                <Grid container xs={12}>
                    <Autocomplete
                        multiple
                        blurOnSelect={false}
                        clearOnEscape={false}
                        disableCloseOnSelect
                        filterSelectedOptions
                        popupIcon={customerLoading ? <Loading size={25} /> : <ArrowDropDownIcon />}
                        id='UserSelect'
                        {...register('customers')}
                        fullWidth

                        getOptionLabel={(option) => `${option.userName} - ${option.phoneNumber}`}
                        filterOptions={(options, { inputValue }) => {
                            return options.filter((option) =>
                                option.phoneNumber.toString().includes(inputValue) || option.userName.includes(inputValue)
                            );
                        }}
                        onChange={(_, newValue) => {
                            setValue('customers', (newValue));
                        }}
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
                                label={t('Notification.users')}
                                placeholder='users'
                                fullWidth
                                helperText={errors.customers?.message}
                                error={!!errors.customers?.message}
                            />
                        ))}
                    />
                </Grid>
            </>
        )
    }

export default Users