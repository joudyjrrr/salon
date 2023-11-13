import { Box, Grid, Stack } from "@mui/material";
import useSalon from "./hook/useSalon";
import TitleWithArrow from "../../Components/TitleWithArrwo";
import { useTranslation } from "react-i18next";
import Inputs from "../../Components/Salon/Inputs";
import GenericObjectAutoCompleteNubmer from "../../Components/Form/GenericObjectAutoCompleteNubmer";
import { SalonTypeArray } from "../../API/Salon/type";
import { Controller } from "react-hook-form";
import SelectLocation from "../../Components/Form/SelectLocation";
import UploadGenericImg from "../../Components/Img/UploadGenericImg";
import ImgCard from "../../Components/Img/ImgCard";
import { FileApi } from "../../API/File/FileApi";
import { API_BASE_URL } from "../../API/domain";
import ModalImgCrop from "../../Components/Img/ModalImgCrop";

const AddSalon = () => {
  const {
    control,
    setValue,
    watch,
    handleCropImgProduct,
    handleManipulateImage,
    imgCoverAfterCrop,
    genericFile,
    setImegesAfterCrop,
    setImgCoverAfterCrop,
    setImgTitle,
    imgagesAfterCrop,
    handleDeleteImg,
    isPendingImg,
    openCropModal,
    setOpenCropModal,
    imgTitle,
  } = useSalon();
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          paddingInline: "40px",
          marginTop: "30px",
        }}
      >
        <TitleWithArrow title={t("salon.add")} />
        <form
          style={{
            marginTop: "50px",
          }}
        >
          <Grid
            item
            container
            lg={12}
            md={12}
            sm={12}
            spacing={{ xs: 2, md: 3 }}
          >
            <Inputs control={control} setValue={setValue} watch={watch} />
            <Grid item lg={3} md={4} sm={6}>
              <Controller
                name="SalonType"
                control={control}
                render={({ field }) => (
                  <GenericObjectAutoCompleteNubmer
                    onChange={field.onChange}
                    value={field.value}
                    option={SalonTypeArray}
                    label={t("form.chooseSalonType")}
                  />
                )}
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6}>
              {imgCoverAfterCrop === "" ? (
                <Controller
                  name="coverImage"
                  control={control}
                  render={() => (
                    <UploadGenericImg
                      onFileUpload={handleManipulateImage}
                      buttonText={t("form.ubloadImgForCover")}
                      setImg={() => setImgTitle("cover")}
                    />
                  )}
                />
              ) : (
                <ImgCard
                  imgSrc={`${API_BASE_URL}/${imgCoverAfterCrop}`}
                  onDeleteImg={() => {
                    FileApi.DeleteFile(imgCoverAfterCrop);
                    setImgCoverAfterCrop("");
                  }}
                  title="Cover Img"
                />
              )}
            </Grid>
            <Grid item lg={3} md={4} sm={6}>
              <UploadGenericImg
                onFileUpload={handleManipulateImage}
                buttonText={t("form.upLoadImg")}
                setImg={() => setImgTitle("images")}
               
              />
              {imgagesAfterCrop &&
                imgagesAfterCrop?.map((img, index) => (
                  <ImgCard
                    imgSrc={`${API_BASE_URL}/${img}`}
                    onDeleteImg={() => {
                      handleDeleteImg(index);
                    }}
                  />
                ))}
            </Grid>
          </Grid>
        </form>
        {genericFile && (
          <ModalImgCrop
            disableCropButton={isPendingImg}
            open={openCropModal}
            onClose={setOpenCropModal}
            handleCropImg={handleCropImgProduct}
            imageFile={genericFile!}
            aspect={imgTitle === "cover" ? 4 / 5 : 1 / 1.1}
          />
        )}
      </Box>
    </>
  );
};
export default AddSalon;
