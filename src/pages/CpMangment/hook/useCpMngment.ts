
import {useEffect} from "react"
import {  useForm } from "react-hook-form";
import { SetUserType } from "../../../API/CpManagement/type";
import { CpManagementQueries } from "../../../API/CpManagement/CpManagementQueries";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../../libs/toast/Tostify";
import { useTranslation } from "react-i18next";
const useCpMngment = (id: string) => {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { isSubmitting },
    reset,
  } = useForm<SetUserType>();
  const {data : userDetails , isLoading} = CpManagementQueries.GetUserByIdQuery(id)
//   console.log(userDetails)
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const { isPending, mutate, isSuccess } = CpManagementQueries.SetUserQuery();
  const { data: roleOption } = CpManagementQueries.GetRoles();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (typeof userDetails !== undefined) {
      setValue("username", userDetails?.username!);
      setValue("roles", roleOption?.find((r) => r.name === userDetails?.role));
      setValue("userId", userDetails?.id);
    }
  }, [userDetails , roleOption]);
  const onSubmit = () => {
    const Id = 
    mutate(
      {
        userId : watch("userId") ?? undefined,
        username: watch("username"),
        password: watch("password"),
        roleId: watch("roles.id"),
      },
      {
        onSuccess: () => {
          setOpen(false);
          reset({
            password: "",
            username: "",
          });
          queryClient.refetchQueries({ queryKey: ["get-users"] });
          showSuccess(t("cpMangment.action"));
        },
        onError(error: any) {
          showError(error.response.data.errorMessage);
        },
      }
    );
  };
  return {
    control,
    setValue,
    open,
    setOpen,
    onSubmit,
    handleSubmit,
    isPending,
    roleOption,
    register,
    isSuccess,
    userDetails,
    isLoading
  };
};
export default useCpMngment;
