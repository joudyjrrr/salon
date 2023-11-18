import { Grid, TextField } from '@mui/material'
import CouponHook from '../hook/CouponHook'
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AddCouponType } from '../hook/type';

const NameAndCode: FC<{
    register: UseFormRegister<AddCouponType>,
    errors: FieldErrors<AddCouponType>
}> = ({ register, errors }) => {

    const { t } = CouponHook()
    

    return (
        <>
            <Grid item xs={12} sm={6} sx={{ mt: '20px' }} width={1}>
                <TextField
                    helperText={errors.name?.message}
                    error={!!errors.name?.message}
                    {...register('name')}
                    label={t("Coupon.name")}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: '20px' }} width={1}>
                <TextField
                    helperText={errors.code?.message}
                    error={!!errors.code?.message}
                    {...register('code')}
                    label={t("Coupon.code")}
                    fullWidth
                    variant="outlined"
                />
            </Grid>
        </>
    )
}

export default NameAndCode