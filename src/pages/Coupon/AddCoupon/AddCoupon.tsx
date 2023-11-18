import { Box, Button, Grid } from "@mui/material"
import CouponHook from "../hook/CouponHook"
import { useState } from "react"
import { AddCouponType } from "../hook/type"
import NameAndCode from "./NameAndCode"
import SetDate from "./SetDate"
import PercentValueComponent from "./PercentValueComponent"
import PublicCityUser from "./PublicCityUser"
import CouponImage from "./CouponImage"
import { showError, showSuccess } from "../../../libs/reactToastify.tsx"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from "../../../Components/Title.tsx"

const AddCoupon = () => {

    const { isAddingCoupon,
        addCoupon,
        handleSubmit,
        errors,
        t,
        setValue, register, setError, getValues, control,
        navigate, reset
    } = CouponHook();

    const [img, setImg] = useState<string>("");
    const [PercentValue, setPercentValue] = useState('value');
    const [CityUser, setCityUser] = useState('Public');


    const submitHandler = (data: AddCouponType) => {


        if (!data.name) {
            setError('name', { message: t('form.required') })
            return
        }
        if (!data.code) {
            setError('code', { message: t('form.required') })
            return
        }
        if (!data.fromDate) {
            setError('fromDate', { message: t('form.required') })
            return
        }
        if (!data.fromDate) {
            setError('fromDate', { message: t('form.required') })
            return
        }
        if (PercentValue === 'value') {
            setValue('percentage', undefined)
        } else {
            setValue('value', undefined)
        }

        if (data.fromDate >= data.toDate) {
            setError('fromDate', { message: t('Coupon.fromError') });
            return
        }

        if (PercentValue === 'percent' && !getValues('percentage')) {
            setError('percentage', { message: t('form.required') })
            return
        }
        if (PercentValue === 'value' && !getValues('value')) {
            setError("value", { message: t('form.required') })
            return
        }
        if (CityUser === 'ByUser' && data.customers?.length === 0) {
            setError('customers', { message: t('form.required') })
            return
        }
        if (img === "") {
            setError('image', { message: t('Coupon.imageRequired') });
            return
        }

        addCoupon({
            cityId: data.city?.id ?? undefined,
            code: data.code,
            image: img,
            name: data.name,
            fromDate: data.fromDate,
            toDate: data.toDate,
            percentage: data.percentage,
            value: getValues('value'),
            customers: data.customers?.map((customer) => customer.userId),
            type: CityUser === 'Public' ? 0 : CityUser === 'ByCity' ? 1 : 2

        },
            {
                onSuccess: () => {
                    showSuccess('Coupon.added')
                    reset()
                    navigate(-1)

                },
                onError: () => {
                    showError('Coupon.wrong')
                }
            })
    }


    return (
        <>
            <Grid container justifyContent={'space-between'} sx={{ mt: 2 }} >
                <Grid container item xs={9}>
                    <Button onClick={() => { navigate(-1) }}>
                        <ArrowBackIcon />
                    </Button>
                    <Grid item sx={{ mx: 5 }}>
                        <Title text={t('Coupon.addTitle')} />
                    </Grid>

                </Grid>

            </Grid >

            <Box sx={{ m: 3 }}>
                <form onSubmit={handleSubmit(submitHandler)}>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            <NameAndCode errors={errors} register={register} />

                            <SetDate control={control} />

                            <PercentValueComponent
                                setPercentValue={setPercentValue}
                                PercentValue={PercentValue}
                                errors={errors}
                                register={register}
                            />
                        </Grid>
                    </Box>
                    <Grid item xs={12} >


                        <PublicCityUser
                            CityUser={CityUser}
                            setCityUser={setCityUser}
                            setValue={setValue}
                            register={register}
                            errors={errors}
                        />

                        <CouponImage
                            img={img}
                            setImg={setImg}
                            setValue={setValue}
                            errors={errors}
                        />
                    </Grid>
                    <Grid container justifyContent={'end'} sx={{ mt: '10px' }}>
                        <Button disabled={isAddingCoupon} type='submit' variant='contained'>
                            {t('form.submit')}
                        </Button>
                    </Grid>
                </form>
            </Box>
        </>
    )
}

export default AddCoupon