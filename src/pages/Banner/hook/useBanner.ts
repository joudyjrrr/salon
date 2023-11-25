import { useForm } from "react-hook-form";
import { SetBannerTypeInput } from "../../../API/Banner/type";
import { DefaultFromDate, DefaultToDate } from "../../../helper/imgHelper";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SalonQueries } from "../../../API/Salon/SalonQueries";
import { ServiceQueries } from "../../../API/Service/ServiceQueries";
import { CityQueries } from "../../../API/City/CityQueries";
import { FileQuery } from "../../../API/File/FileQueries";
import { handleCropImgType } from "../../../interface/generic";
import { BannerQuery } from "../../../API/Banner/BannerQueries";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { useTranslation } from "react-i18next";

const useBanner = () => {
  const { control, setValue, handleSubmit , watch } =
    useForm<SetBannerTypeInput>({
      defaultValues: {
        fromDate: DefaultFromDate(),
        toDate: DefaultToDate(),
      },
    });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { bannerId } = useParams()
  const { data: bannerDetails , isLoading} = BannerQuery.GetBannerByIdQuery(bannerId!)
  console.log(bannerDetails, bannerId)
  useEffect(() => {
    if (bannerDetails) {
      setValue(
        "fromDate",
        bannerDetails.fromDate.slice(0, 16)
      );
      // console.log(bannerDetails.fromDate)
      setValue(
        "toDate",
        bannerDetails.toDate.slice(0, 16)
      );
      setValue("id", bannerDetails.id)
      setImgAfterCrop(bannerDetails.imageURl)
      if (bannerDetails.link) {
        setRadioSelect("link")
        setValue("link", bannerDetails.link)
      } else if (bannerDetails.salonId && bannerDetails.servicedId) {
        setRadioSelect("service")
        setValue("salon", salonOption?.find(d => d.id === bannerDetails.salonId)!)
        setValue("service", serviceOption?.find(d => d.id === bannerDetails.servicedId)!)
      }
      else if (bannerDetails.salonId) {
        setRadioSelect("salon")
        setValue("salon", salonOption?.find(d => d.id === bannerDetails.salonId)!)
      }
    }
  }, [bannerDetails])
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

  const { mutate, isPending } = BannerQuery.SetBannerQuery();
  const { t } = useTranslation();
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
          setOpenCropModal(false)
        },
      }
    );
  };
  const onSubmit = () => {
    console.log(watch("fromDate"), watch("toDate"))
    mutate({
      id: watch("id") ? watch("id") : undefined,
      fromDate: watch("fromDate"),
      toDate: watch("toDate"),
      image: imgAfterCrop,
      citytId: watch("city").id,
      link: watch("link") ? watch("link") : undefined,
      servicedId: watch("service") ? watch("service").id! : undefined,
      salonId: watch("salon") ? watch("salon").id : undefined
    },

      {
        onSuccess: () => {
          navigate(-1);
          queryClient.refetchQueries({ queryKey: ["get-all-banner"] });
          showSuccess(t("Banner.action"));
        },
        onError(errorMessage: any) {
          showError(errorMessage);
        },
      }
    )


  }
  return {
    control,
    isPending,
    setValue,
    isLoading, 
    bannerId,
    onSubmit,
    radioSelect,
    setRadioSelect,
    salonOption,
    serviceOption,
    cityOption,
    handleCropImg,
    handleManipulateImage,
    handleSubmit,
    imgAfterCrop,
    openCropModal,
    setGenericFile,
    setImgAfterCrop,
    genericFile,
    isPendingImg,
    setOpenCropModal
  };
};
export default useBanner;
