import { Button, Grid } from '@mui/material'
import useNotificationsHook from '../hooks/useNotificationsHook.ts';
import TitleAndBody from './TitleAndBody.tsx';
import CountryCity from './CountryCity.tsx';
import Users from './Users.tsx';
import AppType from './AppType.tsx';
import ChooseType from './ChooseType.tsx';
import Title from '../../../Components/Title.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import Loading from '../../../Components/Loading.tsx';
import { DevTool } from "@hookform/devtools";


const AddNotification = () => {

    const {
        isPosting,
        t,
        control,
        errors,
        countries, isCountryLoading, cities, isCitiesLoading, Customers, customerLoading,
        ThisNotification,
        isThisNotificationLoading, id,
        register, handleSubmit, navigate, setNotification,
        watch, setValue, setError, clearErrors, reset, getValues, submitHandler,
        CountryData, CityData, isCountryDataLoading, isCityDataLoading
    } = useNotificationsHook();

    const isAddingPath = !id;

    // const submitHandler: SubmitHandler<AddNotificationType> = (data: AddNotificationType) => {


    //     const titleArabic = data.title[0].value.trim();
    //     const titleEnglish = data.title[1].value.trim();
    //     const bodyArabic = data.body[0].value.trim();
    //     const bodyEnglish = data.body[1].value.trim();
    //     const usersNumber = data.customers?.length;
    //     const city = data.city ?? undefined;
    //     const AppType = data.AppType;

    //     if (!titleArabic && !titleEnglish) {
    //         setError('title.0.value', { message: 'One Title is required' });
    //         return
    //     } else {
    //         clearErrors('title.0.value');
    //     }

    //     if (!bodyArabic && !bodyEnglish) {
    //         setError('body.0.value', { message: 'One Body is required' });
    //         return
    //     } else {
    //         clearErrors('body.0.value');
    //     }
    //     if (!usersNumber && publicUserCity === 'User') {
    //         setError('customers', { message: 'Users is Required' });
    //         return
    //     } else {
    //         clearErrors('customers')
    //     }

    //     if (!city && publicUserCity === 'City') {
    //         setError('city.name', { message: 'City is Required' });
    //         return
    //     } else {
    //         clearErrors('city');
    //     }

    //     if (AppType === undefined) {
    //         setError('AppType', { message: t('form.required') })

    //         return
    //     } else {
    //         clearErrors('AppType')
    //     }


    //     setNotification({
    //         id: isAddingPath ? undefined : id,
    //         title: getValues('title'),
    //         users: data.customers.map((customer) => customer.userId),
    //         body: getValues('body'),
    //         cityId: data.city?.id!,
    //         notificationType: (publicUserCity === 'Public') ? 1 : (publicUserCity === 'User') ? 2 : 3,
    //         appType: AppType
    //     }, {
    //         onSuccess: () => {
    //             reset();
    //             showSuccess(t('Notification.added'))
    //             navigate(-1)
    //         },
    //         onError: () => {
    //             showError(t('Notification.wrong'))
    //         }
    //     })
    // }

    const publicUserCity = watch('publicUserCity');
    useEffect(() => {
        if (!isAddingPath && !!ThisNotification) {

            setValue('title', ThisNotification?.title as [{ key: 'ar', value: string }, { key: 'en', value: string }])
            setValue('body', ThisNotification?.body as [{ key: 'ar', value: string }, { key: 'en', value: string }])
            setValue('AppType', ThisNotification?.appType!);

            if (ThisNotification.notificationType === 1) {
                setValue('publicUserCity', 'Public')
            }
            else if (ThisNotification.notificationType === 2) {
                setValue('publicUserCity', 'User')
                setValue('customers', ThisNotification.customers.map((customer) => { return ({ userId: customer.id, userName: customer.name, phoneNumber: customer.phoneNumber, }) }))
            }
            else {
                setValue('publicUserCity', 'City')
                setValue('country.id', CountryData?.id!)
                setValue('country.name', CountryData?.name[0].value!);
                setValue('city.id', CityData?.id!);
                setValue('city.name', CityData?.name[0].value!)

            }

        }
    }, [ThisNotification, CountryData, CityData])

    if (isThisNotificationLoading || isCountryDataLoading || isCityDataLoading || isCountryLoading) {
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
                        <Title text={isAddingPath ? t('Notification.Add') : t('Notification.EditTitle')} />
                    </Grid>
                </Grid>
            </Grid >
            <Grid container>

                <form onSubmit={handleSubmit(submitHandler)} style={{ width: '100%', margin: '5%' }}>
                    <TitleAndBody
                        register={register}
                        errors={errors}
                        control={control}
                    />

                    <AppType watch={watch} control={control} errors={errors} />

                    <ChooseType
                        publicUserCity={publicUserCity}
                        setValue={setValue}
                    />
                    {
                        (publicUserCity === 'User') &&
                        <>
                            <Users
                                Customers={Customers}
                                errors={errors}
                                register={register}
                                setValue={setValue}
                                watch={watch}
                                customerLoading={customerLoading}
                                control={control}
                            />
                        </>
                    }
                    {
                        (publicUserCity === 'City') &&
                        <>
                            <CountryCity
                                watch={watch}
                                cities={cities}
                                countries={countries}
                                errors={errors}
                                setValue={setValue}
                                register={register}
                                isCitiesLoading={isCitiesLoading}
                                isCountryLoading={isCountryLoading}
                                control={control}
                            />
                        </>
                    }
                    <Grid container justifyContent={'flex-end'}>
                        <Button sx={{ mt: '10px' }} disabled={isPosting} type="submit" variant="contained">
                            {t('form.submit')}
                        </Button>
                    </Grid>
                </form>
            </Grid>
            <DevTool control={control} />
        </>
    )
}

export default AddNotification