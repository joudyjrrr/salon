import { Grid } from '@mui/material'
import CouponHook from '../hook/CouponHook'
import { FC } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { AddCouponType } from '../hook/type';
import FormTextField from '../../../Components/Form/FormTextField';

const NameAndCode: FC<{
    register: UseFormRegister<AddCouponType>,
    errors: FieldErrors<AddCouponType>,
    control: Control<AddCouponType, any>
}> = ({ register, errors, control }) => {

    const { t } = CouponHook()


    return (
        <>
            <Grid item xs={12} sm={6} sx={{ mt: '20px' }} width={1}>
                <FormTextField
                    control={control}
                    name='name'
                    label={t("Coupon.name")}
                    helperText={errors.name?.message}
                    errors={!!errors.name?.message}
                    focused
                />

            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: '20px' }} width={1}>
                <FormTextField
                    control={control}
                    name='code'
                    label={t("Coupon.code")}
                    helperText={errors.code?.message}
                    errors={!!errors.code?.message}
                    focused
                />

            </Grid>
        </>
    )
}

export default NameAndCode