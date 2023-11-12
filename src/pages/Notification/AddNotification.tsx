import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Select, TextField, Typography, MenuItem } from '@mui/material'
import useNotificationsHook from './hooks/useNotificationsHook.tsx'
import { INameAndId } from '../../interface/generic';
import Loading from '../../Components/Loading';
import { ChangeEvent, useState } from 'react';
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AddNotificationType } from './hooks/type.ts';
import { showError, showSuccess } from '../../libs/toast/Tostify.tsx';


function AddNotification() {
    const [Open, setOpen] = useState(false);
    const {
        setNotification,
        isPosting,
        t,
        control,
        register,
        handleSubmit,
        errors,
        watch, setValue, setError, clearErrors, reset, getValues,
        countries, isCountryLoading, cities, isCitiesLoading, Customers, customerLoading
    } = useNotificationsHook();

    const submitHandler: SubmitHandler<AddNotificationType> = (data: AddNotificationType) => {
        console.log({ data });

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
        console.log(data.title);
        const title = getValues('title');
        console.log({ title });
        const body = getValues('body');
        console.log({ body });
        return

        setNotification({
            title: getValues('title'),
            customers: data.customers.map((customer) => customer.userId),
            body: getValues('body'),
            cityId: data.city?.id!,
            notificationType: (publicUserCity === 'Public') ? 0 : (publicUserCity === 'User') ? 1 : 2,
            type
        }, {
            onSuccess: () => {
                reset();
                setOpen(false);
                showSuccess('Notification was sent')

            },
            onError: (error) => {
                showError(error.message)
            }
        })
    }


    const publicUserCity = watch('publicUserCity');

    return (
        <>
            <Button
                variant="contained"
                onClick={() => setOpen(true)}
            >
                {t('Notification.Add')}
            </Button>

            <Dialog
                open={Open}
                onClose={() => setOpen(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <DialogTitle>
                    {t('Notification.Add')}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Typography variant="h6" sx={{ mb: '10px' }}>{t('Notification.Title')}</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField {...register('title.0.value')} fullWidth id="outlined-basic" label={t('Notification.arTitle')} variant="outlined" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register('title.1.value')} fullWidth id="outlined-basic" label={t('Notification.enTitle')} variant="outlined" />
                            </Grid>
                        </Grid>

                        <Typography variant="subtitle2" color={'error'}>{errors.title?.[0]?.value?.message}</Typography>

                        <Typography variant="h6" sx={{ mb: '10px' }}>{t('Notification.Body')}</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField {...register('body.0.value')} id="outlined-basic" multiline rows={4} label={t('Notification.arBody')} variant="outlined" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register('body.1.value')} id="outlined-basic" multiline rows={4} label={t('Notification.enBody')} variant="outlined" />
                            </Grid>
                        </Grid>
                        <Typography variant="subtitle2" color={'error'}>{errors.body?.[0]?.value?.message}</Typography>
                        <FormControl fullWidth sx={{ mt: '10px' }}>
                            <InputLabel id="demo-simple-select-label">{t('Notification.AppType')}</InputLabel>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...field}
                                            label={t('Notification.Type')}
                                            sx={{ maxWidth: '250px' }}
                                        >
                                            <MenuItem value={0}>{t('Notification.Customer')}</MenuItem>
                                            <MenuItem value={1}>{t('Notification.Store')}</MenuItem>
                                            <MenuItem value={2}>{t('Notification.Driver')}</MenuItem>
                                        </Select>

                                    )
                                }}
                            />

                        </FormControl>
                        <Typography color={'error'} variant="subtitle2" sx={{ mt: '10px' }}>{errors.type?.message}</Typography>
                        <FormControl sx={{ mt: '10px' }}>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={publicUserCity}
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) =>
                                        setValue('publicUserCity', event.target.value as "Public" | "User" | "City")
                                }
                            >
                                <FormControlLabel value="Public" control={<Radio />} label={t('Notification.public')} />
                                <FormControlLabel value="User" control={<Radio />} label={t('Notification.byUsers')} />
                                <FormControlLabel value="City" control={<Radio />} label={t('Notification.byCity')} />

                            </RadioGroup>
                        </FormControl>
                        {
                            (publicUserCity === 'User') &&
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
                        }
                        {
                            (publicUserCity === 'City') &&
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
                        }
                        <Grid container justifyContent={'flex-end'}>
                            <Button sx={{ mt: '10px' }} disabled={isPosting} type="submit" variant="contained">
                                {t('form.submit')}
                            </Button>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default AddNotification