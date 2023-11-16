import { Autocomplete, Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import CouponHook from "../hook/CouponHook"
import FormTextField from "../../../Components/Form/FormTextField"
import { ChangeEvent, useState } from "react"
import Loading from "../../../Components/Loading"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { INameAndId, handleCropImgType } from "../../../interface/generic"
import { AddCouponType } from "../hook/type"
import UploadGenericImg from "../../../Components/Img/UploadGenericImg"
import { DEVELOPMENT_BASE_URL } from "../../../API/domain"
import ImgCard from "../../../Components/Img/ImgCard"
import ModalImgCrop from "../../../Components/Img/ModalImgCrop"

const AddCoupon = () => {

    const { isAddingCoupon,
        addCoupon,
        control,
        handleSubmit,
        register,
        errors,
        t,
        customerLoading,
        Customers,
        setValue,
        countries,
        cities,
        mutateImg,
        deleteImage,
        UploadingImg,
        setError, getValues
    } = CouponHook();
    const [Open, setOpen] = useState<boolean>(false)
    const [File, setFile] = useState<File | null>();
    const [img, setImg] = useState<string>("");
    const [PercentValue, setPercentValue] = useState('value');
    const [CityUser, setCityUser] = useState('Public');


    const handleCropImg: handleCropImgType = async (imgFile) => {
        const formData = new FormData();
        formData.append("File", imgFile);
        mutateImg({
            File: imgFile,
            FileType: 0,
        }, {
            onSuccess: (data) => {
                setImg(data);
                setValue('image', img)
                setOpen(false);
            }
        })
    };

    const imageHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) return;
        const file = event.target.files[0];
        setFile(file);
        setOpen(!Open);
    }
    const submitHandler = (data: AddCouponType) => {
        // console.log({ data });
        if (data.name === '') {
            setError('name', { message: t('form.required') })
            return
        }
        if (data.code === '') {
            setError('code', { message: t('form.required') })
            return
        }
        if (data.fromDate === '') {
            setError('fromDate', { message: t('form.required') })
            return
        }
        if (data.fromDate === '') {
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
        if (PercentValue === 'value' && !getValues('value')) {
            setError('value', { message: t('form.required') })
            return
        }
        if (PercentValue === 'percent' && !getValues('percentage')) {
            setError('percentage', { message: t('form.required') })
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
            value: 5,
            // customers: data.customers?.map((customer) => customer.userId),
            customers: [],
            type: 0

        },
            {
                onSuccess: () => {
                    console.log('success');

                },
                onError: () => {
                    console.log('error');

                }
            })
    }

    return (
        <>
            <Box sx={{ m: 3 }}>
                <form onSubmit={handleSubmit(submitHandler)}>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                            <Grid container spacing={3} item xs={12} >
                                <Grid item xs={12} sm={6}>
                                    <FormTextField
                                        label={t("form.fromDate")}
                                        shrink
                                        type="datetime-local"
                                        name="fromDate"
                                        control={control}
                                        dataTest={"fromDate"}

                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormTextField
                                        label={t("form.toDate")}
                                        shrink
                                        type="datetime-local"
                                        name="toDate"
                                        control={control}
                                        dataTest={"toDate"}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={'value'}
                                        name="radio-buttons-group"
                                        row
                                        value={PercentValue}
                                        onChange={
                                            (event: ChangeEvent<HTMLInputElement>) => setPercentValue(event.target.value)
                                        }
                                    >
                                        <FormControlLabel value="value" control={<Radio />} label={t("Coupon.PerValue")} />
                                        <FormControlLabel value="percent" control={<Radio />} label={t("Coupon.PerPercent")} />
                                    </RadioGroup>
                                </FormControl>
                                <Grid container >
                                    {
                                        PercentValue === 'value' &&
                                        <Grid item xs={6}>
                                            <TextField
                                                id="outlined-basic"
                                                {...register('value')}
                                                error={!!errors.value?.message}
                                                helperText={errors.value?.message}
                                                type='number'
                                                label={t("Coupon.PerValue")}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    }
                                    {
                                        PercentValue === 'percent' &&
                                        <Grid item xs={6}>
                                            <TextField
                                                id="outlined-basic"
                                                {...register('percentage')}
                                                error={!!errors.percentage?.message}
                                                helperText={errors.percentage?.message}
                                                type='number'
                                                label={t("Coupon.PerPercent")}
                                                variant="outlined"
                                            />
                                        </Grid>

                                    }

                                </Grid>
                            </Grid>

                        </Grid>
                    </Box>
                    <Grid item xs={12} >
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
                                        // getOptionLabel={(option) => option.userName ?? 'No Name'}
                                        options={Customers?.filter((customer) => customer.userName !== null) ?? []}

                                        renderInput={((params) => (
                                            <TextField
                                                {...params}
                                                label={t("Coupon.Users")}
                                                placeholder='users'
                                                fullWidth

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
                        <Grid container justifyContent={'center'} sx={{ mt: 2 }} item xs={12}>
                            {img === "" ? (
                                <Grid item container justifyContent={'center'} xs={3}>
                                    <UploadGenericImg
                                        onFileUpload={imageHandler}
                                        buttonText={t("form.upLoadImg")}
                                    />
                                </Grid>
                            ) : (
                                <ImgCard
                                    imgSrc={`${DEVELOPMENT_BASE_URL}/${img}`}
                                    onDeleteImg={() => {
                                        deleteImage(img)
                                        setImg("");
                                    }}
                                />
                            )}

                            {File && (
                                <ModalImgCrop
                                    disableCropButton={UploadingImg}
                                    open={Open}
                                    onClose={setOpen}
                                    handleCropImg={handleCropImg}
                                    imageFile={File}
                                    aspect={1 / 1}
                                />
                            )}
                            <Typography color={'error'}>
                                {errors.image?.message}
                            </Typography>
                        </Grid>
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