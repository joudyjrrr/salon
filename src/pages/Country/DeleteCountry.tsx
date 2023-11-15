import { FC, useState } from "react";
import { showError, showSuccess } from "../../libs/toast/Tostify";
import DeleteModal from "../../Components/DeleteModal";
import { CountryQueries } from "../../API/Country/CountryQueries";
import { useTranslation } from "react-i18next";

const DeleteCountry: FC<{ id: string , refetch :()=>void}> = ({ id , refetch }) => {
  const { mutate, isPending } = CountryQueries.DeleteCountry();
  const { t } = useTranslation();
  const [Open, setOpen] = useState<boolean>(false);

  const deleteHandler = () => {
    mutate(id, {
      onSuccess: () => {
        showSuccess(t("Country.delete"));
        setOpen(false);
        refetch()
      },
      onError(error: any) {
        showError(error.response.data.errorMessage);
      },
    });
  };

  return (
    <>
      <DeleteModal
        Open={Open}
        deleteFn={deleteHandler}
        setOpen={setOpen}
        isLoading={isPending}
      />
    </>
  );
};

export default DeleteCountry;
