import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CouponQueries } from "../../../API/Coupon/CouponQueries";
import { useTranslation } from "react-i18next";
import { SetCouponCpType } from "../../../API/Coupon/type";
import { CpManagementQueries } from "../../../API/CpManagement/CpManagementQueries";
import { CountryQueries } from "../../../API/Country/CountryQueries";
import { CityQueries } from "../../../API/City/CityQueries";
import { AddCouponType } from "./type";
import { DefaultFromDate, DefaultToDate } from "../../../helper/DateHelpers";
import { FileQuery } from "../../../API/File/FileQueries";
import { useLocation, useNavigate, useParams } from "react-router";

const CouponHook = (Search?: string, PageNumber?: number) => {
  const [Query, setQuery] = useState<string>("");

  useEffect(() => {
    const time = setTimeout(() => {
      setQuery(Search!);
    }, 500);
    return () => clearTimeout(time);
  }, [Search]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch,
    setError,
  } = useForm<AddCouponType>({
    defaultValues: {
      fromDate: DefaultFromDate(),
      toDate: DefaultToDate(),
    },
  });
  const { t } = useTranslation();
  const { data: Coupons, isLoading: isCouponsLoading } =
    CouponQueries.GetALLCouponsQuery({
      EnablePagination: true,
      PageNumber: PageNumber,
      Query: Query,
    });

  const { mutate: mutateImg, isPending: UploadingImg } =
    FileQuery.SetFileQuery();
  const { mutate: deleteImage } = FileQuery.DeleteFileQuery();
  const { mutate: deleteCoupon, isPending: isDeleting } =
    CouponQueries.DeleteCouponQuery();

  const { mutate: addCoupon, isPending: isAddingCoupon } =
    CouponQueries.SetCouponQuery();

  const { data: countries, isLoading: isCountryLoading } =
    CountryQueries.GetCountryAutoCompleteQuery();
  const country = watch("country");

  const { data: cities, isLoading: isCitiesLoading } =
    CityQueries.GetCityByCountryQuery({
      enabled: country !== undefined,
      EnablePagination: false,
      CountryId: country?.id as string,
    });

  const { data: Customers, isLoading: customerLoading } =
    CpManagementQueries.useCpCustomersNames();
  const params = useParams();
  const { data: ThisCoupon, isLoading: isThisCouponLoading } =
    CouponQueries.GetCouponQuery(params.id);

  const navigate = useNavigate();
  const location = useLocation();
  return {
    register,
    control,
    Coupons,
    isCouponsLoading,
    t,
    isDeleting,
    deleteCoupon,
    isAddingCoupon,
    addCoupon,
    getValues,
    setValue,
    reset,
    watch,
    handleSubmit,
    errors,
    countries,
    isCountryLoading,
    cities,
    isCitiesLoading,
    Customers,
    customerLoading,
    mutateImg,
    UploadingImg,
    deleteImage,
    setError,
    navigate,
    ThisCoupon,
    isThisCouponLoading,
    location,
    params,
  };
};

export default CouponHook;
