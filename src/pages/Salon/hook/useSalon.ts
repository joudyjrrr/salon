

import { useState} from "react"
import {  useForm } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";
import { SalonInput } from "../../../API/Salon/type";
import { handleCropImgType, imgNameTypeProdct } from "../../../interface/generic";
import { FileQuery } from "../../../API/File/FileQueries";

const useSalon = ()=>{
    const {
        control,
        handleSubmit,
        setValue,
        register,
        watch,
        formState: { isSubmitting },
        reset,
      } = useForm<SalonInput>();
      const { t } = useTranslation();
      const [openCropModal, setOpenCropModal] = useState<boolean>(false);
      const [imgTitle, setImgTitle] = useState<imgNameTypeProdct>();
      const [imgagesAfterCrop, setImegesAfterCrop] = useState<string[]>([]);
      const [imgCoverAfterCrop, setImgCoverAfterCrop] = useState<string>("");
      const [genericFile, setGenericFile] = useState<File | null>(null);
      const handleManipulateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const file = e.target.files[0];
        setGenericFile(file);
        setOpenCropModal(!openCropModal);
      };
      const handleDeleteImg = (index: number) => {
        const updatedImages = imgagesAfterCrop?.filter((_, i) => i !== index);
        setImegesAfterCrop(updatedImages);
      };
     const {mutate : mutationImg , isPending : isPendingImg} = FileQuery.SetFileQuery()
      const handleCropImgProduct: handleCropImgType = async (imgFile) => {
        const formData = new FormData();
        formData.append("File", imgFile);
        mutationImg({
          File: imgFile,
          FileType: 4,
        });
      };
      return {
        control,
        setValue,
        watch,
        isPendingImg,
        openCropModal,
        setOpenCropModal,
        imgCoverAfterCrop,
        setImegesAfterCrop,
        genericFile,
        handleDeleteImg,
        handleCropImgProduct,
        handleManipulateImage,
        setImgTitle,
        setImgCoverAfterCrop,
        imgagesAfterCrop,
        imgTitle
      }
}
export default useSalon