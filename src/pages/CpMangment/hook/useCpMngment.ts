import { SubmitHandler, useForm } from "react-hook-form";
import { SetUserType } from "../../../API/CpManagement/type";
import { CpManagementQueries } from "../../../API/CpManagement/CpManagementQueries";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../../libs/reactToastify";
import { useTranslation } from "react-i18next";
const useCpMngment = () => {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { isSubmitting },
    reset,
  } = useForm<SetUserType>();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const { isPending, mutate, isSuccess } = CpManagementQueries.SetUserQuery();
  const { data: roleOption } = CpManagementQueries.GetRoles();
  const queryClient = useQueryClient();
  const onSubmit = () => {
    mutate(
      {
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
  };
};
export default useCpMngment;
