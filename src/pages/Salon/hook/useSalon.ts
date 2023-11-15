import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";
import { DayArray, SalonInput, SalonTypeArray } from "../../../API/Salon/type";
import {
  handleCropImgType,
  imgNameTypeProdct,
} from "../../../interface/generic";
import { FileQuery } from "../../../API/File/FileQueries";
import { DefaultFromDate, dayTimeConvert } from "../../../helper/imgHelper";
import { SalonQueries } from "../../../API/Salon/SalonQueries";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { CityQueries } from "../../../API/City/CityQueries";

const useSalon = () => {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    reset,
  } = useForm<SalonInput>({
    defaultValues: {
      workSchedule: Array(7).fill({
        day: DayArray[0],
        startTime: DefaultFromDate(),
        endTime: DefaultFromDate(),
        isFree: false,
      }),
    },
  });
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openCropModal, setOpenCropModal] = useState<boolean>(false);
  const [imgTitle, setImgTitle] = useState<imgNameTypeProdct>();
  const [imgagesAfterCrop, setImegesAfterCrop] = useState<string[]>([]);
  const [imgCoverAfterCrop, setImgCoverAfterCrop] = useState<string>("");
  const [genericFile, setGenericFile] = useState<File | null>(null);
  const { salonId } = useParams();
  const { data: salonDetails } = SalonQueries.GetSalonDetailsQuery(salonId!);
  const { data: cityOption } = CityQueries.GetCityAutoCompleteQuery();
  console.log(salonDetails);
  useEffect(()=>{
     if(salonDetails){
      setValue("name",salonDetails.name)
      setValue("description",salonDetails.description)
      setValue("phoneNumber",salonDetails.phoneNumber)
      setValue("tempPhoneNumber",salonDetails.tempPhoneNumber)
      setValue("instagramUrl",salonDetails.instagramUrl)
      setValue("facebookUrl",salonDetails.facebookUrl)
      setValue("SalonType",SalonTypeArray.find((d)=>d.id === salonDetails.salonType)!)
      setValue("latitude",salonDetails.address.latitude)
      setValue("longitude",salonDetails.address.longitude)
      setImgCoverAfterCrop(salonDetails.logo)
      setValue("city",cityOption?.find((n)=>n.id === salonDetails.address.cityId)!)
       salonDetails.workSchedule.forEach((day,index)=>{
        setValue(`workSchedule.${index}.isFree`, day.isFree);
        setValue(`workSchedule.${index}.startTime`,day.startTime)
        setValue(`workSchedule.${index}.endTime`,day.endTime)
       })
     }
  },[salonDetails , cityOption])
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
  const { mutate, isPending } = SalonQueries.SetSalonQuery();
  const { mutate: mutationImg, isPending: isPendingImg } =
    FileQuery.SetFileQuery();
  const handleCropImgProduct: handleCropImgType = async (imgFile) => {
    const formData = new FormData();
    formData.append("File", imgFile);
    mutationImg(
      {
        File: imgFile,
        FileType: 4,
      },
      {
        onSuccess(data) {
          switch (imgTitle) {
            case "cover":
              setImgCoverAfterCrop(data);
              break;
            case "images":
              setImegesAfterCrop((prevImages) => [...prevImages!, data]);
          }
          setOpenCropModal(false);
        },
      }
    );
  };

  const onSubmit = () => {
    mutate(
      {
        workSchedule: watch("workSchedule").map((day, index) => {
          return {
            day: index,
            startTime: dayTimeConvert(day.startTime),
            endTime: dayTimeConvert(day.endTime),
            isFree: day.isFree ? day.isFree : false,
          };
        }),
        salonType: watch("SalonType.id"),
        address: {
          latitude: watch("latitude")!,
          longitude: watch("longitude")!,
          cityId: watch("city.id"),
        },
        name: watch("name"),
        description: watch("description"),
        phoneNumber: watch("phoneNumber"),
        tempPhoneNumber: watch("tempPhoneNumber"),
        facebookUrl: watch("facebookUrl"),
        instagramUrl: watch("instagramUrl"),
        logo: imgCoverAfterCrop,
        imageUrls: imgagesAfterCrop,
      },
      {
        onSuccess: () => {
          navigate(-1);
          queryClient.refetchQueries({ queryKey: ["get-all-salon"] });
          showSuccess(t("salon.acion"));
        },
        onError(error: any) {
          showError(error.response.data.errorMessage);
        },
      }
    );
  };

  return {
    control,
    handleSubmit,
    setValue,
    watch,
    isPendingImg,
    isPending,
    openCropModal,
    setOpenCropModal,
    onSubmit,
    imgCoverAfterCrop,
    setImegesAfterCrop,
    genericFile,
    handleDeleteImg,
    handleCropImgProduct,
    handleManipulateImage,
    setImgTitle,
    setImgCoverAfterCrop,
    imgagesAfterCrop,
    imgTitle,
  };
};
export default useSalon;
