import { useForm } from "react-hook-form";
import { SetBannerTypeInput } from "../../../API/Banner/type";
import { DefaultFromDate, DefaultToDate } from "../../../helper/imgHelper";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SalonQueries } from "../../../API/Salon/SalonQueries";
import { ServiceQueries } from "../../../API/Service/ServiceQueries";
import { CityQueries } from "../../../API/City/CityQueries";
import { FileQuery } from "../../../API/File/FileQueries";
import { handleCropImgType } from "../../../interface/generic";

const useBanner = () => {
  const { control, setValue, register, handleSubmit, setError, watch, reset } =
    useForm<SetBannerTypeInput>({
      defaultValues: {
        fromDate: DefaultFromDate(),
        toDate: DefaultToDate(),
      },
    });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: salonOption } = SalonQueries.GetSalonOption();
  // console.log(watch("salon"))
  const [openCropModal, setOpenCropModal] = useState<boolean>(false);
  const [imgAfterCrop, setImgAfterCrop] = useState<string>("");
  const [genericFile, setGenericFile] = useState<File | null>(null);
  const { data: serviceOption } =
    ServiceQueries.GetServiceDetailsAutoCompleteQuery(watch("salon")?.id);
  const { data: cityOption } = CityQueries.GetCityAutoCompleteQuery();
  const [radioSelect, setRadioSelect] = useState<string>("link");
  const handleManipulateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setGenericFile(file);
    setOpenCropModal(!openCropModal);
  };

  // const { mutate, isPending } = SalonQueries.SetSalonQuery();

  const { mutate: mutationImg, isPending: isPendingImg } =
    FileQuery.SetFileQuery();
  const handleCropImg: handleCropImgType = async (imgFile) => {
    const formData = new FormData();
    formData.append("File", imgFile);
    mutationImg(
      {
        File: imgFile,
        FileType: 4,
      },
      {
        onSuccess(data) {
          setImgAfterCrop(data);
        },
      }
    );
  };

  return {
    control,
    setValue,
    radioSelect,
    setRadioSelect,
    salonOption,
    serviceOption,
    cityOption,
    handleCropImg,
    handleManipulateImage,
    handleSubmit,
  };
};
export default useBanner;
