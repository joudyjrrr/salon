import { Button, Grid, Select, TextField, MenuItem, InputLabel, FormControl } from "@mui/material"
import useCategoryHook from "./hooks/useCategoryHook"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Controller } from "react-hook-form";
import Title from "../../Components/Title";
import UploadGenericImg from "../../Components/Img/UploadGenericImg";
import { ChangeEvent, useState } from "react";
import ImgCard from "../../Components/Img/ImgCard";
import { DEVELOPMENT_BASE_URL } from "../../API/domain";
import { FileQuery } from "../../API/File/FileQueries";


const AddCategory = () => {
    const [File, setFile] = useState<File | null>();
    const [Open, setOpen] = useState(false);
    const [img, setImg] = useState<string>("");
    const {
        t,
        navigate,
        control,
        register
    } = useCategoryHook();

    

    const imageHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) return;

        const file = event.target.files[0];
        setFile(file);
        setOpen(!Open);
    }


    return (
        <>
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
                <Grid container justifyContent={'center'} item xs={12}>
                    <TextField
                        {...register('name.0.value')}
                        variant="outlined"
                        label={t('form.arName')}
                        placeholder={t('form.arName')}
                    />
                </Grid>
                <Grid container justifyContent={'center'} item xs={12}>
                    <TextField
                        {...register('name.1.value')}
                        variant="outlined"
                        label={t('form.enName')}
                        placeholder={t('form.enName')}
                    />
                </Grid>
                <Grid container justifyContent={'center'} item xs={3}>
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
                        <UploadGenericImg
                            onFileUpload={imageHandler}
                            buttonText={t("form.upLoadImg")}
                        />
                    ) : (
                        <ImgCard
                            imgSrc={`${DEVELOPMENT_BASE_URL}/${img}`}
                            onDeleteImg={() => {
                                // FileQuery.DeleteFileQuery(img)
                                setImg("");
                            }}
                        />
                    )}
                </Grid>
            </Grid>

        </>
    )
}

export default AddCategory