import { Button, Grid, Select, TextField, MenuItem, InputLabel, FormControl } from "@mui/material"
import useCategoryHook from "./hooks/useCategoryHook"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Controller } from "react-hook-form";
import Title from "../../Components/Title";
import UploadGenericImg from "../../Components/Img/UploadGenericImg";
import { ChangeEvent, useState } from "react";
import ImgCard from "../../Components/Img/ImgCard";
import { DEVELOPMENT_BASE_URL } from "../../API/domain";
import ModalImgCrop from "../../Components/Img/ModalImgCrop";
import { handleCropImgType } from "../../interface/generic";
import { AddCategoryType } from "./hooks/type";
import { showError, showSuccess } from "../../libs/reactToastify";



const AddCategory = () => {
    const [File, setFile] = useState<File | null>();
    const [Open, setOpen] = useState(false);
    const [img, setImg] = useState<string>("");
    const {
        t,
        navigate,
        control,
        register,
        deleteImage,
        mutateImg,
        UploadingImg,
        setValue,
        handleSubmit,
        isCategoryLoading,
        SetCategory,
        reset
    } = useCategoryHook();

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

    const SubmitHandler = (data: AddCategoryType) => {
        SetCategory({
            name: data.name,
            image: img,
            type: 0
        },
            {
                onSuccess: () => {
                    reset()
                    setImg('')
                    setValue('type', null)
                    showSuccess(t('Category.added'));
                },
                onError: () => {
                    showError(t('Category.wrong'))
                }
            })
    }


    return (
        <>
            <form action="" onSubmit={handleSubmit(SubmitHandler)}>

                <Grid container justifyContent={'space-between'} sx={{ mt: 2 }} >
                    <Grid container item xs={9}>
                        <Grid item sx={{ mx: 5 }}>
                            <Button sx={{ mt: 2, ml: 2 }} variant="outlined" onClick={() => navigate(-1)} >
                                <ArrowBackIcon />
                            </Button>
                        </Grid>
                        <Title text={t('Category.add')} />
                    </Grid>

                </Grid >

                <Grid spacing={2} justifyContent={'center'} container sx={{ mt: 2 }}>
                    <Grid container justifyContent={'end'} item xs={6}>
                        <TextField
                            {...register('name.0.value')}
                            variant="outlined"
                            label={t('form.arName')}
                            placeholder={t('form.arName')}
                        />
                    </Grid>
                    <Grid container item xs={6}>
                        <TextField
                            {...register('name.1.value')}
                            variant="outlined"
                            label={t('form.enName')}
                            placeholder={t('form.enName')}
                        />
                    </Grid>
                    <Grid container justifyContent={'center'} item xs={12}>
                        <FormControl fullWidth sx={{ mt: '10px', width: '25%' }}>
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
                                        >
                                            <MenuItem value={0}>{t('Notification.Customer')}</MenuItem>
                                            <MenuItem value={1}>{t('Notification.Store')}</MenuItem>
                                            <MenuItem value={2}>{t('Notification.Driver')}</MenuItem>
                                        </Select>
                                    )
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container justifyContent={'center'} item xs={12}>
                        {img === "" ? (
                            <Grid item container justifyContent={'center'} xs = {3}>
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
                    </Grid>
                </Grid>
                <Grid sx={{ mt: 2 }} container justifyContent={'center'}>
                    <Button type="submit" variant="contained" disabled={isCategoryLoading}>
                        {t('form.submit')}
                    </Button>
                </Grid>
            </form>
        </>
    )
}

export default AddCategory