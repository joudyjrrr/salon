import { SubmitHandler, useForm } from "react-hook-form";
import { ServiveInput } from "../../../API/Service/type";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { handleCropImgType, imgNameTypeProdct } from "../../../interface/generic";
import { FileQuery } from "../../../API/File/FileQueries";
import { ServiceQueries } from "../../../API/Service/ServiceQueries";
import { DefaultFromDate, makeActionArray } from "../../../helper/imgHelper";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryQuery } from "../../../API/Category/CategoryQueries";

const useService = () => {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    setError,
    watch,
    reset,
  } = useForm<ServiveInput>({
    defaultValues: {
      period: DefaultFromDate()
    }
  });

  const [openCropModal, setOpenCropModal] = useState<boolean>(false);
  const [imgTitle, setImgTitle] = useState<imgNameTypeProdct>();
  const [imgagesAfterCrop, setImegesAfterCrop] = useState<string[]>([]);
  const [imgCoverAfterCrop, setImgCoverAfterCrop] = useState<string>("");
  const [genericFile, setGenericFile] = useState<File | null>(null);
  const { salonId } = useParams();
  const {servId} = useParams()
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

  const { mutate: mutationImg, isPending: isPendingImg } =
    FileQuery.SetFileQuery();
  const handleCropImg: handleCropImgType = async (imgFile) => {
    const formData = new FormData();
    formData.append("File", imgFile);
    mutationImg(
      {
        File: imgFile,
        FileType: 3,
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
  const {data : servDetails , isLoading} = ServiceQueries.GetServDetailsQuery(servId!)
  const { data: categoryOP } = CategoryQuery.GetCategoryAutoComplete();
  useEffect(()=>{
      if(servDetails){
        setValue("id",servDetails.id)
        setValue("enName",servDetails.name.find((d)=>d.key == 'en')?.value!)
        setValue("arName",servDetails.name.find((d)=>d.key == 'ar')?.value!)
        setValue("enDescription",servDetails.description.find((d)=>d.key == 'en')?.value!)
        setValue("arDescription",servDetails.description.find((d)=>d.key == 'ar')?.value!)
        setValue("period",  new Date(servDetails.period).toISOString().slice(0, 16))
        // console.log(servDetails.period.toISOString())
        setValue("price",servDetails.price)
        setValue("offerPrice",servDetails.offerPrice)
        setImgCoverAfterCrop(servDetails.coverImage)
        setImegesAfterCrop(servDetails.images)
        setValue("category",categoryOP?.find((d)=>d.id === servDetails.categoryId)!)

      }
  },[servDetails])
  const { mutate, isPending } = ServiceQueries.SetServiceQuery()
  const onSubmit: SubmitHandler<ServiveInput> = async (data) => {
    mutate({
      id: watch("id") ? watch("id") : undefined,
      offerPrice: watch("offerPrice"),
      price: watch("price"),
      name: makeActionArray(data),
      description: makeActionArray(data),
      images: imgagesAfterCrop,
      coverImage: imgCoverAfterCrop,
      categoryId: watch("category").id,
      period: watch("period"),
      salonId: salonId!
    }, {
      onSuccess: () => {
        navigate(-1);
        queryClient.refetchQueries({ queryKey: ["get-service"] });
        showSuccess(t("serv.action"));
      },
      onError(error: any) {
        showError(error.response.data.errorMessage);
      },
    })
  }
  return {
    control,
    onSubmit,
    servId,
    isLoading,
    setValue,
    isPending,
    watch,
    handleSubmit,
    genericFile,
    handleCropImg,
    handleManipulateImage,
    handleDeleteImg,
    imgCoverAfterCrop,
    imgTitle,
    imgagesAfterCrop,
    setImgTitle,
    setGenericFile,
    setImegesAfterCrop,
    setImgCoverAfterCrop,
    isPendingImg,
    openCropModal,
    setOpenCropModal

  };
};
export default useService;
