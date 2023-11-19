import { Grid, TextField } from '@mui/material'
import CouponHook from '../hook/CouponHook'
import { FC } from 'react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { AddCouponType } from '../hook/type';

const NameAndCode: FC<{
    register: UseFormRegister<AddCouponType>,
    errors: FieldErrors<AddCouponType>,
    control: Control<AddCouponType, any>
}> = ({ register, errors, control }) => {

    const { t } = CouponHook()


    return (
        <>
            <Grid item xs={12} sm={6} sx={{ mt: '20px' }} width={1}>
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) =>
                        <TextField
                            focused
                            helperText={errors.name?.message}
                            error={!!errors.name?.message}
                            {...field}
                            label={t("Coupon.name")}
                            variant="outlined"
                            fullWidth
                        />
                    }
                />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: '20px' }} width={1}>

                <Controller
                    name='code'
                    control={control}
                    render={({ field }) =>

                        <TextField
                            focused
                            helperText={errors.code?.message}
                            error={!!errors.code?.message}
                            {...field}
                            label={t("Coupon.code")}
                            fullWidth
                            variant="outlined"
                        />
                    }
                />
            </Grid>
        </>
    )
}

export default NameAndCode