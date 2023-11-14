import { FC, useState } from "react";
import { showError, showSuccess } from "../../libs/toast/Tostify";
import DeleteModal from "../../Components/DeleteModal";
import { useTranslation } from "react-i18next";
import { SalonQueries } from "../../API/Salon/SalonQueries";

const DeleteSalon: FC<{ id: string; refetch: () => void }> = ({
  id,
  refetch,
}) => {
  const { mutate, isPending } = SalonQueries.DeleteSalon();
  const { t } = useTranslation();
  const [Open, setOpen] = useState<boolean>(false);

  const deleteHandler = () => {
    mutate(id, {
      onSuccess: () => {
        showSuccess(t("cpMangment.delete"));
        setOpen(false);
        refetch();
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

export default DeleteSalon;
