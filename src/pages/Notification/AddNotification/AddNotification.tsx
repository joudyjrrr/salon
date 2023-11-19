import { Button, Grid } from '@mui/material'
import useNotificationsHook from '../hooks/useNotificationsHook.ts';
import { SubmitHandler } from 'react-hook-form';
import { AddNotificationType } from '../hooks/type.ts';
import { showError, showSuccess } from '../../../libs/toast/Tostify.tsx';
import TitleAndBody from './TitleAndBody.tsx';
import CountryCity from './CountryCity.tsx';
import Users from './Users.tsx';
import AppType from './AppType.tsx';
import ChooseType from './ChooseType.tsx';
import Title from '../../../Components/Title.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import Loading from '../../../Components/Loading.tsx';



const AddNotification = () => {

    const {
        setNotification,
        isPosting,
        t,
        control,
        register,
        handleSubmit,
        errors,
        watch, setValue, setError, clearErrors, reset, getValues,
        countries, isCountryLoading, cities, isCitiesLoading, Customers, customerLoading,
        location, navigate,
        ThisNotification,
        isThisNotificationLoading
    } = useNotificationsHook();

    const isAddingPath = location.pathname === '/notifications/addNotification'

    const submitHandler: SubmitHandler<AddNotificationType> = (data: AddNotificationType) => {


        const titleArabic = data.title[0].value.trim();
        const titleEnglish = data.title[1].value.trim();
        const bodyArabic = data.body[0].value.trim();
        const bodyEnglish = data.body[1].value.trim();
        const usersNumber = data.customers?.length;
        const city = data.city ?? undefined;
        const type = data.type;

        if (!titleArabic && !titleEnglish) {
            setError('title.0.value', { message: 'One Title is required' });
            return
        } else {
            clearErrors('title.0.value');
        }

        if (!bodyArabic && !bodyEnglish) {
            setError('body.0.value', { message: 'One Body is required' });
            return
        } else {
            clearErrors('body.0.value');
        }
        if (!usersNumber && publicUserCity === 'User') {
            setError('customers', { message: 'Users is Required' });
            return
        } else {
            clearErrors('customers')
        }

        if (!city && publicUserCity === 'City') {
            setError('city.name', { message: 'City is Required' });
            return
        } else {
            clearErrors('city');
        }

        if (type === undefined) {
            setError('type', { message: t('form.required') })

            return
        } else {
            clearErrors('type')
        }


        setNotification({
            title: getValues('title'),
            users: data.customers.map((customer) => customer.userId),
            body: getValues('body'),
            cityId: data.city?.id!,
            notificationType: (publicUserCity === 'Public') ? 0 : (publicUserCity === 'User') ? 1 : 2,
            type
        }, {
            onSuccess: () => {
                reset();
                showSuccess(t('Notification.added'))

            },
            onError: () => {
                showError(t('Notification.wrong'))
            }
        })
    }

    useEffect(() => {
        if (!isAddingPath) {
            setValue('title', ThisNotification?.title as [{ key: 'ar', value: string }, { key: 'en', value: string }])
            setValue('body', ThisNotification?.body as [{ key: 'ar', value: string }, { key: 'en', value: string }])
            // setValue('type')
            
        }
    }, [ThisNotification])

    if (isThisNotificationLoading) {
        return <Loading />
    }

    const publicUserCity = watch('publicUserCity');

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
                    />

                    <AppType control={control} errors={errors} />

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
        </>
    )
}

export default AddNotification