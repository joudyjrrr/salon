

import {useEffect} from "react"
import {  useForm } from "react-hook-form";
import { SetUserType } from "../../../API/CpManagement/type";
import { CpManagementQueries } from "../../../API/CpManagement/CpManagementQueries";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../../libs/toast/Tostify";
import { useTranslation } from "react-i18next";
import { SalonData, SalonInput } from "../../../API/Salon/type";

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
      return {
        control,
        setValue,
        watch
      }
}
export default useSalon