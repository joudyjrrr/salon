import { Box, Button, Grid } from "@mui/material"
import CouponHook from "../hook/CouponHook"
import { useEffect, useState } from "react"
import { AddCouponType } from "../hook/type"
import NameAndCode from "./NameAndCode"
import SetDate from "./SetDate"
import PercentValueComponent from "./PercentValueComponent"
import PublicCityUser from "./PublicCityUser"
import CouponImage from "./CouponImage"
import { showError, showSuccess } from "../../../libs/reactToastify.tsx"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from "../../../Components/Title.tsx"
import { FromISO } from "../../../helper/DateHelpers.ts"
import Loading from "../../../Components/Loading.tsx"



const AddCoupon = () => {

    const { isAddingCoupon,
        addCoupon,
        handleSubmit,
        errors,
        t,
        setValue, register, setError, getValues, control,
        navigate, reset, location,
        ThisCoupon, isThisCouponLoading, params, countries, cities
    } = CouponHook();


    const [img, setImg] = useState<string>("");
    const [PercentValue, setPercentValue] = useState('value');
    const [CityUser, setCityUser] = useState('Public');
    const isAddingPath = location.pathname === '/coupon/addCoupon'
    const id = params.id;



    useEffect(() => {
        if (!!ThisCoupon && !isAddingPath) {
            setValue('name', ThisCoupon?.name)
            setValue('code', ThisCoupon?.code)
            // setValue('image', ThisCoupon.image)
            setImg(ThisCoupon.image)
            setValue('fromDate', FromISO(ThisCoupon.fromDate))
            setValue('toDate', FromISO(ThisCoupon.toDate))
            setValue('value', ThisCoupon.value)
            setValue('percentage', ThisCoupon.percentage)
            if (!!ThisCoupon.percentage) {
                setPercentValue('percent')
            }
            // if(!!ThisCoupon.)

        }

    }, [ThisCoupon])

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
            id: isAddingPath ? undefined : id,
            cityId: data.city?.id ?? undefined,
            code: data.code,
            image: img,
            name: data.name,
            fromDate: data.fromDate,
            toDate: data.toDate,
            percentage: data.percentage,
            value: getValues('value'),
            customers: data.customers?.map((customer) => customer.userId),
            type: CityUser === 'Public' ? 0 : CityUser === 'ByCity' ? 2 : 1

        },
            {
                onSuccess: () => {
                    showSuccess(t('Coupon.added'))
                    reset()
                    navigate(-1)
                },
                onError: () => {
                    showError(t('Coupon.wrong'))
                }
            })
    }
    if (isThisCouponLoading && !isAddingCoupon) {
        return <Loading />
    }


    return (
        <>
            <Grid container justifyContent={'space-between'} sx={{ mt: 2 }} >
                <Grid container item xs={9}>
                    <Button onClick={() => { navigate(-1) }}>
                        <ArrowBackIcon />
                    </Button>
                    <Grid item sx={{ mx: 5 }}>
                        <Title text={isAddingPath ? t('Coupon.addTitle') : t('Coupon.editTitle')} />
                    </Grid>

                </Grid>

            </Grid >

            <Box sx={{ m: 3 }}>
                <form onSubmit={handleSubmit(submitHandler)}>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            <NameAndCode
                                errors={errors}
                                register={register}
                                control={control}
                            />

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
                            countries={countries}
                            cities={cities}
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